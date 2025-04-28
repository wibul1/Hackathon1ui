import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { MeetingRoomAdminRoutingModule } from './meeting-room-admin-routing.module';
import { RoomComponent } from './room/room.component';
import { ZoneComponent } from './zone/zone.component';
import { ReserveRoomComponent } from './reserve-room/reserve-room.component';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms'; 
@NgModule({
  declarations: [
    RoomComponent,
    ZoneComponent,
    ReserveRoomComponent
  ],
  imports: [
    CommonModule,
    MeetingRoomAdminRoutingModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class MeetingRoomAdminModule { }
