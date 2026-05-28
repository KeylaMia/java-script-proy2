import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../service/product-service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {

  @Input() item!: Product;

  @Output() onAdd = new EventEmitter<Product>();

  agregarAlCarrito(): void {
    this.onAdd.emit(this.item);
  }

}

