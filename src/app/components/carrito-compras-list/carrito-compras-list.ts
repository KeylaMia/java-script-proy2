import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../service/product-service';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-carrito-compras-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito-compras-list.html',
  styleUrl: './carrito-compras-list.css',
})


export class CarritoComprasList {
  @Input() cartItems: CartItem[] = [];
  @Output() onCheckout = new EventEmitter<void>();
  @Output() onQuantityChanged = new EventEmitter<{ productId: string | number, newQuantity: number }>();
  @Output() onItemRemoved = new EventEmitter<string | number>();
  
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
  if (newQuantity > 0) {
    this.onQuantityChanged.emit({ productId, newQuantity });
  }
}

removeItem(productId: string | number): void {
  this.onItemRemoved.emit(productId);
}

  procederAlPago(): void {
    this.onCheckout.emit();
  }
}



