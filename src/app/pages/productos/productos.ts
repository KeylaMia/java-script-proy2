import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../service/product-service';
import { ProductsList } from '../../components/products-list/products-list';
import { Loader } from '../../components/loader/loader'; 
import { Modal } from '../../components/modal/modal';
import { CarritoComprasList } from '../../components/carrito-compras-list/carrito-compras-list';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductsList, Loader, Modal],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos implements OnInit {

  productosBase: Product[] = [];
  productosFiltrados: Product[] = [];

  textoBuscar: string = '';
  categoriaSeleccionada: string = 'Todos';
  estaCargando: boolean = true;

  modalAbierto: boolean = false;
  modalConfig = { title: '', message: '', type: 'info' as 'success' | 'danger' };
  
  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.estaCargando = true;
    
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        if (data && data.products) {
          this.productosBase = data.products;
        } else {
          this.productosBase = data;
        }
        
        this.productosFiltrados = [...this.productosBase];
        this.estaCargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando la API:', err);
        this.estaCargando = false;
      }
    });
  }

  aplicarFiltros(): void {
    this.productosFiltrados = this.productosBase.filter(producto => {
      const titulo = producto.title ? producto.title.toLowerCase() : '';
      const cumpleTexto = titulo.includes(this.textoBuscar.toLowerCase());
      
      const categoriaProd = producto.category ? producto.category.toLowerCase() : '';
      const cumpleCategoria = this.categoriaSeleccionada === 'Todos' || 
                             categoriaProd === this.categoriaSeleccionada.toLowerCase();

      return cumpleTexto && cumpleCategoria;
    });
  }

  filtrarPorCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    this.aplicarFiltros();
  }

}