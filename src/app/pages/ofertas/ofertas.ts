import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../service/product-service';
import { ProductsList } from '../../components/products-list/products-list';
import { Loader } from '../../components/loader/loader'; 
import { Modal } from '../../components/modal/modal';
import { CarritoComprasList, CartItem } from '../../components/carrito-compras-list/carrito-compras-list';

@Component({
  selector: 'app-ofertas',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductsList, Loader, Modal, CarritoComprasList],
  templateUrl: './ofertas.html',
  styleUrl: './ofertas.css',
})
export class Ofertas implements OnInit {
  productosOfertaBase: Product[] = [];
  productosFiltrados: Product[] = [];

  textoBuscar: string = '';
  categoriaSeleccionada: string = 'Todos';
  estaCargando: boolean = true;


  modalAbierto: boolean = false;
  modalConfig = { title: '', message: '', type: 'info' as 'success' | 'danger' };
  itemsEnCarrito: CartItem[] = [];

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.estaCargando = true;

    this.productService.getProducts().subscribe({
      next: (data: any) => {
        let todosLosProductos: Product[] = [];

        if (data && data.products) {
          todosLosProductos = data.products;
        } else if (Array.isArray(data)) {
          todosLosProductos = data;
        }

        this.productosOfertaBase = todosLosProductos.filter(
          producto => producto.discount !== undefined && producto.discount > 0
        );

        this.productosFiltrados = [...this.productosOfertaBase];
        this.estaCargando = false;

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando las ofertas:', err);
        this.estaCargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  aplicarFiltros(): void {
    this.productosFiltrados = this.productosOfertaBase.filter(producto => {
      const titulo = producto.title ? producto.title.toLowerCase() : '';
      const cumpleTexto = titulo.includes(this.textoBuscar.toLowerCase());
      
      const categoriaProd = producto.category || (producto as any).categoria || '';
      const cumpleCategoria = this.categoriaSeleccionada === 'Todos' || 
                             categoriaProd.toLowerCase().trim() === this.categoriaSeleccionada.toLowerCase().trim();

      return cumpleTexto && cumpleCategoria;
    });
  }

  filtrarPorCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    this.aplicarFiltros();
  }

  agregarAlCarrito(product: Product): void {
    const itemExistente = this.itemsEnCarrito.find(item => item.product.id === product.id);
    if (itemExistente) {
      itemExistente.quantity += 1;
    } else {
      this.itemsEnCarrito.push({ product, quantity: 1 });
    }

    this.modalConfig = {
      title: '¡Aviso de Promoción!',
      message: `Añadiste "${product.title}" aprovechando su precio especial de descuento.`,
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
      title: 'Procesando Carrito de Ofertas',
      message: 'Redireccionando de manera segura para aplicar tus tarifas rebajadas...',
      type: 'success'
    };
    this.modalAbierto = true;
  }
}