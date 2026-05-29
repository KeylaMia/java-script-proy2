import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product-service'; 
import { Toast } from 'bootstrap';


export interface CartItem {
  product: Product;
  quantity: number;
}



@Injectable({
  providedIn: 'root',
})

export class CartService {
  
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  
  cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

  constructor() {}

  private get currentCartValue(): CartItem[] {
    return this.cartItemsSubject.value;
  }

    addProduct(product: Product): void {
    const currentItems = [...this.currentCartValue];
    const itemIndex = currentItems.findIndex(item => item.product.id === product.id);

    if (itemIndex > -1) {
      currentItems[itemIndex].quantity += 1;
    } else {
      currentItems.push({ product, quantity: 1 });
    }
    this.cartItemsSubject.next(currentItems);

    this.mostrarAlertaBootstrap(product.title);
  }

  private mostrarAlertaBootstrap(productoTitulo: string): void {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      container.setAttribute('style', 'z-index: 1100;');
      document.body.appendChild(container);
    }

    const toastElement = document.createElement('div');
    toastElement.className = 'toast align-items-center text-white bg-success border-0 shadow-lg';
    toastElement.setAttribute('role', 'alert');
    toastElement.setAttribute('aria-live', 'assertive');
    toastElement.setAttribute('aria-atomic', 'true');
    toastElement.innerHTML = `
      <div class="d-flex p-3">
        <div class="toast-body d-flex align-items-center gap-2">
          <i class="bi bi-check-circle-fill fs-5"></i>
          <div>
            <strong>¡Producto agregado!</strong><br>
            <small class="opacity-75">${productoTitulo} se sumó al carrito.</small>
          </div>
        </div>
        <button type="button" class="btn-close btn-close-white m-auto me-0" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;

    container.appendChild(toastElement);

    const toastInstance = new Toast(toastElement, {
      delay: 2500,
      autohide: true
    });
    
    toastInstance.show();

    toastElement.addEventListener('hidden.bs.toast', () => {
      toastElement.remove();
    });
  }




  updateQuantity(productId: string | number, newQuantity: number): void {
    if (newQuantity <= 0) {
      this.removeItem(productId);
      return;
    }

    const currentItems = this.currentCartValue.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    this.cartItemsSubject.next(currentItems);
  }


  removeItem(productId: string | number): void {
    const currentItems = this.currentCartValue.filter(item => item.product.id !== productId);
    this.cartItemsSubject.next(currentItems);
  }


  getTotalItemsCount(): number {
    return this.currentCartValue.reduce((acc, item) => acc + item.quantity, 0);
  }


  clearCart(): void {
    this.cartItemsSubject.next([]);
  }
}