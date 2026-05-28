import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  correo: string = '';
  contrasena: string = '';

  // Estados de control visual
  loginValidated: boolean = false;
  cargando: boolean = false;
  errorLogin: string = '';

  constructor(private router: Router) {}

  handleLoginSubmit(event: Event): void {
    event.preventDefault();
    this.errorLogin = ''; 

    const form = event.target as HTMLFormElement;

    if (!form.checkValidity()) {
      this.loginValidated = true;
      return;
    }

    this.cargando = true;
    this.loginValidated = false;

    console.log('Intentando iniciar sesión con:', { correo: this.correo, contrasena: this.contrasena });

    setTimeout(() => {
      this.cargando = false;
      if (this.correo === 'cliente@tech.com' && this.contrasena === '123456') {
        console.log('¡Acceso concedido!');
        
        this.router.navigate(['/dashboard']);
      } else {
        this.errorLogin = 'El correo electrónico o la contraseña son incorrectos. Prueba con cliente@tech.com y 123456';
      }
    }, 2000);
  }
}