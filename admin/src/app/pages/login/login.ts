import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  errorMsg: string = '';

  constructor(private router: Router) {}

  login() {
    const email = (document.querySelector('input[type="email"]') as HTMLInputElement).value;
    const password = (document.querySelector('input[type="password"]') as HTMLInputElement).value;

    if (email === 'daisy@admin.com' && password === 'daisy123') {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMsg = 'Correo o contraseña incorrectos';
    }
  }
}