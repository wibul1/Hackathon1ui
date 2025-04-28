import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { MeetingRoomRoutingModule } from './meeting-room-routing.module';
import { RoomListComponent } from './room-list/room-list.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { FormsModule } from '@angular/forms'; // Import FormsModule if needed
@NgModule({
  declarations: [
    RoomListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MeetingRoomRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MeetingRoomModule { }
