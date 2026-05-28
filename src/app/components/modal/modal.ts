import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',  
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  @Input() isOpen: boolean = false;
  @Input() title: string = 'Aviso del Sistema';
  @Input() message: string = '';
  @Input() type: 'success' | 'danger' | 'info' | 'warning' = 'info'; 
  @Input() btnText: string = 'Aceptar';

  @Output() onClose = new EventEmitter<void>();

  closeModal(): void {
    this.onClose.emit();
  }

}

