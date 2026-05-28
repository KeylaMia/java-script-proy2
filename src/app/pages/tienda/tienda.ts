import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/product-service';
import { Product } from '../../service/product-service';
import { ProductsList } from '../../components/products-list/products-list';
import { OnInit } from '@angular/core';
import { Solution } from '../home/home';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, ProductsList ],
  templateUrl: './tienda.html',
  styleUrl: './tienda.css',
})
export class Tienda implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error cargando el catálogo', err)
    });
  }

  agregarAlCarritoGlobal(producto: Solution): void {
    console.log('Agregando al carrito desde la tienda:', producto.title);
  }

}