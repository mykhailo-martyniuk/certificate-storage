import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-certificate-list-item',
  templateUrl: './certificate-list-item.component.html',
  styleUrls: ['./certificate-list-item.component.css'],
})
export class CertificateListItemComponent {
  @Input()
  selected = false;
  @Input()
  title = '';
  @Output()
  delete: EventEmitter<void> = new EventEmitter<void>();

  handleDeleteClick = () => {
    this.delete.emit();
  };
}
