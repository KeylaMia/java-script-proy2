import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../service/product-service';
import { ProductsList } from '../../components/products-list/products-list';
import { Loader } from '../../components/loader/loader'; 
import { Modal } from '../../components/modal/modal';


@Component({
  selector: 'app-ofertas',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductsList, Loader, Modal],
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



}