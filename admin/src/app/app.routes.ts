import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { CitasComponent } from './pages/citas/citas'; 
import { MensajesComponent } from './pages/mensajes/mensajes';
import { PacientesComponent } from './pages/pacientes/pacientes';
import { ServiciosComponent } from './pages/servicios/servicios';
import { RecursosComponent } from './pages/recursos/recursos';
import { NuevoRecurso } from './pages/nuevo-recurso/nuevo-recurso';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
   { path: 'citas', component: CitasComponent },
  { path: 'mensajes', component: MensajesComponent },
  { path: 'pacientes', component: PacientesComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'recursos', component: RecursosComponent },
  { path: 'recursos/nuevo', component: NuevoRecurso },
  { path: 'recursos/editar/:id', component: NuevoRecurso },
];


