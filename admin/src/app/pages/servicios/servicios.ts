import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase';

interface Servicio {
  id: string;
  nombre: string;
  descripcion?: string;
  activo: boolean;
  orden?: number;
  created_at?: string;
}

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servicios.html',
  styleUrls: ['./servicios.css']
})
export class ServiciosComponent implements OnInit {

  servicios: Servicio[] = [];
  cargando = false;
  error = '';

  mostrarModal = false;
  modoEdicion = false;
  servicioSeleccionado: Partial<Servicio> = {};
  guardando = false;

  mostrarConfirmar = false;
  servicioAEliminar: Servicio | null = null;

  constructor(
    private supabaseService: SupabaseService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarServicios();
  }

  async cargarServicios() {
    this.cargando = true;
    this.error = '';
    const { data, error } = await this.supabaseService.client
      .from('servicios')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) this.error = 'Error al cargar servicios.';
    else this.servicios = data ?? [];
    this.cargando = false;
    this.cd.detectChanges();
  }

  async toggleActivo(servicio: Servicio) {
    const nuevoEstado = !servicio.activo;
    const { error } = await this.supabaseService.client
      .from('servicios')
      .update({ activo: nuevoEstado })
      .eq('id', servicio.id);
    if (!error) {
      servicio.activo = nuevoEstado;
      this.cd.detectChanges();
    }
  }

  abrirModalNuevo() {
    this.modoEdicion = false;
    this.servicioSeleccionado = { activo: true };
    this.mostrarModal = true;
  }

  abrirModalEditar(servicio: Servicio) {
    this.modoEdicion = true;
    this.servicioSeleccionado = { ...servicio };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.servicioSeleccionado = {};
  }

  async guardarServicio() {
    if (!this.servicioSeleccionado.nombre?.trim()) return;
    this.guardando = true;

    const payload = {
      nombre: this.servicioSeleccionado.nombre,
      descripcion: this.servicioSeleccionado.descripcion,
      activo: this.servicioSeleccionado.activo ?? true,
    };

    if (this.modoEdicion && this.servicioSeleccionado.id) {
      await this.supabaseService.client
        .from('servicios')
        .update(payload)
        .eq('id', this.servicioSeleccionado.id);
    } else {
      await this.supabaseService.client
        .from('servicios')
        .insert([payload]);
    }

    await this.cargarServicios();
    this.cerrarModal();
    this.guardando = false;
  }

  confirmarEliminar(servicio: Servicio) {
    this.servicioAEliminar = servicio;
    this.mostrarConfirmar = true;
  }

  async eliminarServicio() {
    if (!this.servicioAEliminar) return;
    await this.supabaseService.client
      .from('servicios')
      .delete()
      .eq('id', this.servicioAEliminar.id);
    await this.cargarServicios();
    this.mostrarConfirmar = false;
    this.servicioAEliminar = null;
  }

  cancelarEliminar() {
    this.mostrarConfirmar = false;
    this.servicioAEliminar = null;
  }
}