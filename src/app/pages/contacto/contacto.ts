import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Modal } from '../../components/modal/modal';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule, Modal],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto {
  nombre: string = '';
  correo: string = '';
  celular: string = '';
  mensaje: string = '';
  presupuestoEstimado: number = 0;

  contactValidated: boolean = false;
  enviando: boolean = false;
  modalAbierto: boolean = false;
  modalConfig = { title: '', message: '', type: 'info' as 'success' | 'danger' };

  handleContactSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    if (!form.checkValidity()) {
      this.contactValidated = true;
      return;
    }

    this.enviando = true;
    this.contactValidated = false;

    console.log('Datos capturados con ngModel:', {
      nombre: this.nombre,
      correo: this.correo,
      celular: this.celular,
      presupuesto: this.presupuestoEstimado,
      mensaje: this.mensaje
    });

    setTimeout(() => {
      this.enviando = false;
      
      this.modalConfig = {
        title: '¡Cotización en Proceso!',
        message: `Gracias ${this.nombre}. Evaluaremos tu requerimiento de desarrollo a medida con un presupuesto estimado de USD ${this.presupuestoEstimado}.`,
        type: 'success'
      };
      this.modalAbierto = true;

      this.nombre = '';
      this.correo = '';
      this.celular = '';
      this.mensaje = '';
      this.presupuestoEstimado = 0;
    }, 2000);
  }

}

