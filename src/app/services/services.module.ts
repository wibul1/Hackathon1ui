import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveRoomService } from './meeting-room/reserve-room.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    ReserveRoomService
  ]
})
export class ServicesModule { }
