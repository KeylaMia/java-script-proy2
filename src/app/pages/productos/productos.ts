import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductService, Product } from '../../service/product-service';
import { ProductsList } from '../../components/products-list/products-list';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, ProductsList],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos implements OnInit {

  products$!: Observable<Product[]>;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {

    this.products$ = this.productService.getProducts();
  }

  agregarAlCarrito(product: Product): void {
    console.log('Producto agregado:', product);
  }
}