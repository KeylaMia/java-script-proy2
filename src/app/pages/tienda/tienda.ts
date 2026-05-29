import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../service/product-service';
import { ProductsList } from '../../components/products-list/products-list';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, ProductsList],
  templateUrl: './tienda.html',
  styleUrl: './tienda.css',
})
export class Tienda implements OnInit {
  
  products: Product[] = [];

  constructor(private productService: ProductService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        if (data && data.products) {
          this.products = data.products;
        } else if (Array.isArray(data)) {
          this.products = data;
        }
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando el catálogo de Soft Consultores:', err);
      }
    });
  }

  agregarAlCarritoGlobal(producto: Product): void {
    console.log('Agregando al carrito desde la tienda:', producto.title);
  }
}