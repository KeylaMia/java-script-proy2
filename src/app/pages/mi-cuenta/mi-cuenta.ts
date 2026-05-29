import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface PerfilCuenta {
  nombre: string;
  empresa: string;
  rucOrDni: string;
  correo: string;
  telefono: string;
  miembroDesde: string;
}

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
  selector: 'app-mi-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mi-cuenta.html',
  styleUrl: './mi-cuenta.css',
})
export class MiCuenta implements OnInit {
  editandoDatos: boolean = false;
  editandoPassword: boolean = false;

  mensajeExito: string = '';
  errorPassword: string = '';

  perfil: PerfilCuenta = {
    nombre: '',
    empresa: '',
    rucOrDni: '',
    correo: '',
    telefono: '',
    miembroDesde: ''
  };

  passwordActual: string = '';
  nuevaPassword: string = '';
  confirmarPassword: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const session = localStorage.getItem('userSession');

    if (!session) {
      this.router.navigate(['/home']);
      return;
    }

    this.prepararDatosCliente();
    this.cargarDatosCliente();
  }

  prepararDatosCliente(): void {
    const clienteGuardado = localStorage.getItem('clienteData');
    const sessionGuardada = localStorage.getItem('userSession');

    if (clienteGuardado || !sessionGuardada) {
      return;
    }

    const session = JSON.parse(sessionGuardada);

    const clienteInicial: ClienteData = {
      correo: session.usuario,
      contrasena: '123456',
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

  cargarDatosCliente(): void {
    const data = localStorage.getItem('clienteData');

    if (!data) {
      return;
    }

    const cliente: ClienteData = JSON.parse(data);

    this.perfil = {
      nombre: cliente.perfil.nombre,
      empresa: cliente.perfil.empresa,
      rucOrDni: cliente.perfil.rucOrDni,
      correo: cliente.correo,
      telefono: cliente.perfil.telefono,
      miembroDesde: cliente.perfil.miembroDesde
    };
  }

  activarEdicionDatos(): void {
    this.editandoDatos = true;
    this.mensajeExito = '';
  }

  cancelarEdicionDatos(): void {
    this.editandoDatos = false;
    this.mensajeExito = '';
    this.cargarDatosCliente();
  }

  guardarDatos(): void {
    const data = localStorage.getItem('clienteData');

    if (!data) {
      return;
    }

    const clienteActual: ClienteData = JSON.parse(data);

    const clienteActualizado: ClienteData = {
      ...clienteActual,
      correo: this.perfil.correo,
      perfil: {
        nombre: this.perfil.nombre,
        empresa: this.perfil.empresa,
        rucOrDni: this.perfil.rucOrDni,
        telefono: this.perfil.telefono,
        miembroDesde: this.perfil.miembroDesde
      }
    };

    localStorage.setItem('clienteData', JSON.stringify(clienteActualizado));
    localStorage.setItem('userSession', JSON.stringify({
      token: 'xyz123',
      usuario: this.perfil.correo
    }));

    this.editandoDatos = false;
    this.mensajeExito = 'Datos actualizados correctamente.';
  }

  activarEdicionPassword(): void {
    this.editandoPassword = true;
    this.mensajeExito = '';
    this.errorPassword = '';
  }

  cancelarEdicionPassword(): void {
    this.editandoPassword = false;
    this.errorPassword = '';
    this.passwordActual = '';
    this.nuevaPassword = '';
    this.confirmarPassword = '';
  }

  guardarPassword(): void {
    this.errorPassword = '';
    this.mensajeExito = '';

    const data = localStorage.getItem('clienteData');

    if (!data) {
      return;
    }

    const clienteActual: ClienteData = JSON.parse(data);

    if (this.passwordActual !== clienteActual.contrasena) {
      this.errorPassword = 'La contraseña actual no es correcta.';
      return;
    }

    if (this.nuevaPassword.length < 6) {
      this.errorPassword = 'La nueva contraseña debe tener al menos 6 caracteres.';
      return;
    }

    if (this.nuevaPassword !== this.confirmarPassword) {
      this.errorPassword = 'Las contraseñas no coinciden.';
      return;
    }

    clienteActual.contrasena = this.nuevaPassword;
    localStorage.setItem('clienteData', JSON.stringify(clienteActual));

    this.cancelarEdicionPassword();
    this.mensajeExito = 'Contraseña actualizada correctamente.';
  }

}