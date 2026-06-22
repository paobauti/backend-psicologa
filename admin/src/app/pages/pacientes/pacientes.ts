import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase';

interface Usuario {
  id: string;
  nombre: string;
  email?: string;
  telefono?: string;
  created_at?: string;
}

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pacientes.html',
  styleUrls: ['./pacientes.css']
})
export class PacientesComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  busqueda = '';
  cargando = false;
  error = '';

  paginaActual = 1;
  porPagina = 10;

  mostrarModal = false;
  modoEdicion = false;
  usuarioSeleccionado: Partial<Usuario> = {};
  guardando = false;

  mostrarConfirmar = false;
  usuarioAEliminar: Usuario | null = null;

  constructor(
    private supabaseService: SupabaseService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  async cargarUsuarios() {
    this.cargando = true;
    this.error = '';
    const { data, error } = await this.supabaseService.client
      .from('usuarios')
      .select('*')
      .order('nombre', { ascending: true });

    if (error) {
      this.error = 'Error al cargar pacientes.';
    } else {
      this.usuarios = data ?? [];
      this.filtrar();
    }
    this.cargando = false;
    this.cd.detectChanges();
  }

  filtrar() {
    const texto = this.busqueda.toLowerCase().trim();
    this.usuariosFiltrados = texto
      ? this.usuarios.filter(u =>
          u.nombre.toLowerCase().includes(texto) ||
          u.email?.toLowerCase().includes(texto) ||
          u.telefono?.includes(texto)
        )
      : [...this.usuarios];
    this.paginaActual = 1;
  }

  get usuariosPagina(): Usuario[] {
    const inicio = (this.paginaActual - 1) * this.porPagina;
    return this.usuariosFiltrados.slice(inicio, inicio + this.porPagina);
  }

  get totalPaginas(): number {
    return Math.ceil(this.usuariosFiltrados.length / this.porPagina);
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  cambiarPagina(p: number) {
    if (p >= 1 && p <= this.totalPaginas) this.paginaActual = p;
  }

  abrirModalNuevo() {
    this.modoEdicion = false;
    this.usuarioSeleccionado = {};
    this.mostrarModal = true;
  }

  abrirModalEditar(usuario: Usuario) {
    this.modoEdicion = true;
    this.usuarioSeleccionado = { ...usuario };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.usuarioSeleccionado = {};
  }

  async guardarUsuario() {
    if (!this.usuarioSeleccionado.nombre?.trim()) return;
    this.guardando = true;

    const { nombre, email, telefono } = this.usuarioSeleccionado;

    if (this.modoEdicion && this.usuarioSeleccionado.id) {
      const { error } = await this.supabaseService.client
        .from('usuarios')
        .update({ nombre, email, telefono })
        .eq('id', this.usuarioSeleccionado.id);
      if (!error) { await this.cargarUsuarios(); this.cerrarModal(); }
    } else {
      const { error } = await this.supabaseService.client
        .from('usuarios')
        .insert([{ nombre, email, telefono }]);
      if (!error) { await this.cargarUsuarios(); this.cerrarModal(); }
    }
    this.guardando = false;
  }

  confirmarEliminar(usuario: Usuario) {
    this.usuarioAEliminar = usuario;
    this.mostrarConfirmar = true;
  }

  async eliminarUsuario() {
    if (!this.usuarioAEliminar) return;
    await this.supabaseService.client
      .from('usuarios')
      .delete()
      .eq('id', this.usuarioAEliminar.id);
    await this.cargarUsuarios();
    this.mostrarConfirmar = false;
    this.usuarioAEliminar = null;
  }

  cancelarEliminar() {
    this.mostrarConfirmar = false;
    this.usuarioAEliminar = null;
  }

  formatearFecha(fecha?: string): string {
    if (!fecha) return '—';
    return new Date(fecha).toLocaleDateString('es-MX', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  }
}