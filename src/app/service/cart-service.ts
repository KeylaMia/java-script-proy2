import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product-service'; 

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