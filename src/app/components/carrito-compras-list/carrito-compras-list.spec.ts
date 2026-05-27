import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoComprasList } from './carrito-compras-list';

describe('CarritoComprasList', () => {
  let component: CarritoComprasList;
  let fixture: ComponentFixture<CarritoComprasList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarritoComprasList],
    }).compileComponents();

    fixture = TestBed.createComponent(CarritoComprasList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
