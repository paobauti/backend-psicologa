import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  readonly client: SupabaseClient;

  constructor() {
    this.client = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // ─── AUTENTICACIÓN ───
  async iniciarSesion(email: string, password: string) {
    return await this.client.auth.signInWithPassword({ email, password });
  }

  async cerrarSesion() {
    return await this.client.auth.signOut();
  }

  async getUsuarioActual() {
    const { data } = await this.client.auth.getUser();
    return data.user;
  }

  async getSession() {
    const { data } = await this.client.auth.getSession();
    return data.session;
  }
}