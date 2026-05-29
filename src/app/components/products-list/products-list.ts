
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../service/product-service';
import { ProductCard } from '../product-card/product-card';
import { CartService } from '../../service/cart-service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})

export class ProductsList {

  @Input() productsList: Product[] = [];
  @Output() onProductAdded = new EventEmitter<Product>();

  constructor(private cartService: CartService) {}

  handleCardEvent(product: Product): void {
    this.onProductAdded.emit(product);
  }

  agregarAlCarritoGlobal(producto: Product): void {
    this.cartService.addProduct(producto); 
    console.log('Producto enviado al servicio con éxito:', producto.title);
  }

}




