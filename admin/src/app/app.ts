import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NgIf } from '@angular/common';
import { Sidebar } from './shared/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  mostrarSidebar = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.mostrarSidebar = !event.urlAfterRedirects.includes('/login');
      }
    });
  }
}