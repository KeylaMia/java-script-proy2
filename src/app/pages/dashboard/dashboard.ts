import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


interface DocumentoContable {
  id: string;
  tipo: 'Factura' | 'Boleta';
  concepto: string;
  monto: number;
  estado: 'Pagado' | 'Vencido' | 'Procesando';
  fechaEmision: string;
}


interface PerfilCliente {
  nombre: string;
  empresa: string;
  rucOrDni: string;
  correo: string;
  telefono: string;
  miembroDesde: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  
  puntosGanados: number = 3450;
  creditosDisponibles: number = 120.00; 
  totalSolucionesContratadas: number = 3;


  clientePerfil!: PerfilCliente;

 
  documentos: DocumentoContable[] = [];

  ngOnInit(): void {
    this.clientePerfil = {
      nombre: 'Carlos Mendoza Ramos',
      empresa: 'Mendoza Tech Solutions S.A.C.',
      rucOrDni: '20601234567',
      correo: 'carlos.mendoza@techsolutions.com',
      telefono: '+51 987 654 321',
      miembroDesde: 'Febrero 2025'
    };


    this.documentos = [
      { id: 'FFF1-00412', tipo: 'Factura', concepto: 'Licencia Anual ERP Soft Gestión', monto: 1500.00, estado: 'Pagado', fechaEmision: '15/05/2026' },
      { id: 'BBB1-00189', tipo: 'Boleta', concepto: 'Módulo Mac e iOS Integración', monto: 250.00, estado: 'Pagado', fechaEmision: '20/04/2026' },
      { id: 'FFF1-00385', tipo: 'Factura', concepto: 'Soporte Técnico Cloud Dedicado (Mensual)', monto: 120.00, estado: 'Procesando', fechaEmision: '26/05/2026' },
      { id: 'FFF1-00290', tipo: 'Factura', concepto: 'Renovación API Facturación Electrónica', monto: 450.50, estado: 'Vencido', fechaEmision: '10/03/2026' }
    ];
  }
}