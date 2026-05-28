import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solution } from '../../app/pages/home/home';

export interface Product {
  id: string;
  icon: string;
  title: string;
  cardDescription: string;
  modalTitle: string;
  modalDescription: string;
  price: number;
  discount: number;
  category: string;
}

@Injectable({
  providedIn: 'root',
  
})

export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(
      `${this.apiUrl}/${id}`
    );
  }
}




