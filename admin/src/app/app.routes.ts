import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Citas } from './pages/citas/citas';
import { Mensajes } from './pages/mensajes/mensajes';
import { Pacientes } from './pages/pacientes/pacientes';
import { Servicios } from './pages/servicios/servicios';
import { Recursos } from './pages/recursos/recursos';
import { NuevoRecurso } from './pages/nuevo-recurso/nuevo-recurso';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'citas', component: Citas },
  { path: 'mensajes', component: Mensajes },
  { path: 'pacientes', component: Pacientes },
  { path: 'servicios', component: Servicios },
  { path: 'recursos', component: Recursos },
  { path: 'recursos/nuevo', component: NuevoRecurso },
  { path: 'recursos/editar/:id', component: NuevoRecurso },
];