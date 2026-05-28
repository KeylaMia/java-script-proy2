import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductService, Product } from '../../service/product-service';
import { ProductsList } from '../../components/products-list/products-list';
import { Loader } from '../../components/loader/loader'; 
import { Modal } from '../../components/modal/modal';
import { CarritoComprasList, CartItem } from '../../components/carrito-compras-list/carrito-compras-list';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, ProductsList, Loader, Modal, CarritoComprasList],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})

export class Productos implements OnInit {

  products$!: Observable<Product[]>;
  modalAbierto: boolean = false;
  modalConfig = { title: '', message: '', type: 'info' as 'success' | 'danger' };
  misProductosAgregados: Product[] = [];
  itemsEnCarrito: CartItem[] = [];
  
  constructor(private productService: ProductService) {}

  ngOnInit(): void {

    this.products$ = this.productService.getProducts();
  }

  agregarAlCarrito(product: Product): void {
    const itemExistente = this.itemsEnCarrito.find(item => item.product.id === product.id);
    if (itemExistente) {
      itemExistente.quantity += 1;
    } else {
      this.itemsEnCarrito.push({ product, quantity: 1 });
    }

    this.modalConfig = {
      title: '¡Añadido al carrito!',
      message: `El producto "${product.title}" se agregó correctamente.`,
      type: 'success'
    };
    this.modalAbierto = true;
  }

  manejarCambioCantidad(evento: { productId: string | number, newQuantity: number }): void {
    const item = this.itemsEnCarrito.find(i => i.product.id === evento.productId);
    if (item) {
      item.quantity = evento.newQuantity;
    }
  }

  eliminarDelCarrito(productId: string | number): void {
    this.itemsEnCarrito = this.itemsEnCarrito.filter(item => item.product.id !== productId);
  }

  procesarCheckout(): void {
    this.modalConfig = {
      title: 'Procesando Pedido',
      message: 'Redireccionando de manera segura a la pasarela de pagos de Soft Consultores...',
      type: 'success'
    };
    this.modalAbierto = true;
    
  }

}