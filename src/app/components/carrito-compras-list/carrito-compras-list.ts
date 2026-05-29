import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { CartService, CartItem } from '../../service/cart-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carrito-compras-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrito-compras-list.html',
  styleUrl: './carrito-compras-list.css',
})
export class CarritoComprasList implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  private cartSubscription!: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartItems$.subscribe({
      next: (items) => {
        this.cartItems = items;
      },
      error: (err) => console.error('Error al recuperar el carrito:', err)
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }


  get subtotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }

  get totalDiscount(): number {
    return this.cartItems.reduce((acc, item) => {
      const discountAmount = item.product.discount 
        ? item.product.price * (item.product.discount / 100) 
        : 0;
      return acc + (discountAmount * item.quantity);
    }, 0);
  }

  get total(): number {
    return this.subtotal - this.totalDiscount;
  }

  updateQuantity(productId: string | number, currentQuantity: number, change: number): void {
    const newQuantity = currentQuantity + change;
    this.cartService.updateQuantity(productId, newQuantity);
  }

  removeItem(productId: string | number): void {
    this.cartService.removeItem(productId);
  }

  procederAlPago(): void {
    alert('Redireccionando de manera segura a la pasarela de pago...');
    this.cartService.clearCart();
  }
}