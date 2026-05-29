import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface ClienteData {
  correo: string;
  contrasena: string;
  perfil: {
    nombre: string;
    empresa: string;
    rucOrDni: string;
    telefono: string;
    miembroDesde: string;
  };
}

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

    console.log('Intentando iniciar sesión con:', {
      correo: this.correo,
      contrasena: this.contrasena
    });

    setTimeout(() => {
      this.cargando = false;

      const clienteData = localStorage.getItem('clienteData');

      let correoValido = 'cliente@tech.com';
      let contrasenaValida = '123456';

      if (clienteData) {
        const cliente: ClienteData = JSON.parse(clienteData);
        correoValido = cliente.correo;
        contrasenaValida = cliente.contrasena;
      }

      if (this.correo === correoValido && this.contrasena === contrasenaValida) {
        localStorage.setItem('userSession', JSON.stringify({
          token: 'xyz123',
          usuario: this.correo
        }));

        if (!clienteData) {
          const clienteInicial: ClienteData = {
            correo: this.correo,
            contrasena: this.contrasena,
            perfil: {
              nombre: 'Carlos Mendoza Ramos',
              empresa: 'Mendoza Tech Solutions S.A.C.',
              rucOrDni: '20601234567',
              telefono: '+51 987 654 321',
              miembroDesde: 'Febrero 2025'
            }
          };

          localStorage.setItem('clienteData', JSON.stringify(clienteInicial));
        }

        console.log('Acceso concedido');
        this.router.navigate(['/dashboard']);
      } else {
        this.errorLogin = 'El correo electrónico o la contraseña son incorrectos.';
      }
    }, 2000);
  }
}