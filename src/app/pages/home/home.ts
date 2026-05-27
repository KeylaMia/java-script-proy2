import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';


type SolutionId = 'chatbot' | 'inventarios' | 'gestion' | 'dashboards' | 'ecommerce';
interface Solution {
  id: SolutionId;
  icon: string;
  title: string;
  cardDescription: string;
  modalTitle: string;
  modalDescription: string;
  price: number;
}

interface User {
  nombre: string;
  email: string;
  password: string;
}


@Component({
  selector: 'app-home',
  imports: [DecimalPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})



export class Home {
  solutions: Solution[] = [
    {
      id: 'chatbot',
      icon: 'bi-whatsapp',
      title: 'Chatbots WhatsApp',
      cardDescription: 'Automatiza atención y ventas con respuestas 24/7.',
      modalTitle: 'Chatbots para WhatsApp',
      modalDescription:
        'Automatizamos la atención al cliente mediante chatbots inteligentes integrados con WhatsApp para ventas, reservas y soporte 24/7.',
      price: 300,
    },
    {
      id: 'inventarios',
      icon: 'bi-box-seam',
      title: 'Sistema de Inventarios',
      cardDescription: 'Control de stock y reportes en tiempo real.',
      modalTitle: 'Sistema de Inventarios',
      modalDescription: 'Sistema web para control de stock, entradas, salidas, reportes y dashboards en tiempo real.',
      price: 600,
    },
    {
      id: 'gestion',
      icon: 'bi-gear',
      title: 'Sistemas de Gestión',
      cardDescription: 'Administra procesos y clientes desde una plataforma.',
      modalTitle: 'Sistemas de Gestión',
      modalDescription: 'Plataformas personalizadas para administrar clientes, procesos internos y operaciones empresariales.',
      price: 800,
    },
    {
      id: 'dashboards',
      icon: 'bi-graph-up',
      title: 'Dashboards & Reportes',
      cardDescription: 'Decisiones estratégicas basadas en datos.',
      modalTitle: 'Dashboards y Reportes',
      modalDescription: 'Visualización clara de indicadores clave para apoyar la toma de decisiones estratégicas.',
      price: 400,
    },
    {
      id: 'ecommerce',
      icon: 'bi-cart-check',
      title: 'Plataformas Ecommerce',
      cardDescription: 'Tiendas online escalables y personalizadas.',
      modalTitle: 'Plataformas Ecommerce',
      modalDescription: 'Tiendas online personalizadas con pagos, gestión de productos, pedidos y escalabilidad.',
      price: 1000,
    },
  ];

  selectedSolution = this.solutions[0];
  contactValidated = false;
  successMessage = '';
  users: User[] = [];
  cart: Solution[] = [];
  cartVisible = false;

  get cartSubtotal(): number {
    return this.cart.reduce((total, item) => total + item.price, 0);
  }

  get cartDiscount(): number {
    return this.cart.length >= 2 ? this.cartSubtotal * 0.15 : 0;
  }

  get cartTotal(): number {
    return this.cartSubtotal - this.cartDiscount;
  }

  desktopSlides(): Solution[][] {
    return [this.solutions.slice(0, 3), this.solutions.slice(3)];
  }

  selectSolution(solution: Solution): void {
    this.selectedSolution = solution;
  }

  handleContactSubmit(event: Event, name: string, email: string, phone: string): void {
    event.preventDefault();
    event.stopPropagation();

    const form = event.target as HTMLFormElement;
    if (!form.checkValidity()) {
      this.contactValidated = true;
      return;
    }

    const firstName = name.trim().split(' ')[0];
    this.successMessage = `
      <h5 class="mb-2">¡Gracias por contactarnos, ${firstName}!</h5>
      <p class="mb-1">Hemos recibido tu mensaje correctamente.</p>
      <p class="mb-1">
        Nuestro equipo se pondrá en contacto contigo pronto a través del
        correo <strong>${email}</strong> o al número <strong>${phone}</strong>.
      </p>
      <p class="mb-0">Será un gusto ayudarte a desarrollar tu solución tecnológica.</p>
    `;

    form.reset();
    this.contactValidated = false;
  }

  registerUser(event: Event, nombre: string, email: string, password: string): void {
    event.preventDefault();

    const nombreValue = nombre.trim();
    const emailValue = email.trim();
    const passwordValue = password.trim();
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!regexEmail.test(emailValue)) {
      alert('Error: Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (!regexPassword.test(passwordValue)) {
      alert('Error: La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.');
      return;
    }

    if (this.users.some((user) => user.email === emailValue)) {
      alert('Error: Este correo ya está registrado.');
      return;
    }

    this.users.push({ nombre: nombreValue, email: emailValue, password: passwordValue });
    alert('¡Registro exitoso!');
    (event.target as HTMLFormElement).reset();
  }

  addToCart(): void {
    this.cart.push(this.selectedSolution);
    this.cartVisible = true;
  }

  removeItem(index: number): void {
    this.cart.splice(index, 1);
  }

  toggleCart(): void {
    this.cartVisible = !this.cartVisible;
  }

  finalizePurchase(): void {
    alert(
      'Compra exitosa.\n\n' +
        'Tu compra ha sido registrada correctamente.\n' +
        'Te enviaremos un correo electrónico con los pasos\n' +
        'para continuar el proceso mediante nuestra pasarela de pagos.\n\n' +
        'Gracias por confiar en nosotros.',
    );
  }
}









