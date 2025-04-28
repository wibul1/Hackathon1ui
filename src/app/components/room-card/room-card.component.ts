import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss']
})
export class RoomCardComponent {

  @Input() zone: string = '';
  @Input() room: string = '';
  @Input() status: string = '';
  @Input() time: string = '';
  @Input() rawStatus: string = '';

  @Output() onReserve = new EventEmitter<void>();

  reserve() {
    this.onReserve.emit();
  }
}
