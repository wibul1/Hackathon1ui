import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from "../components/components.module";
import { ReactiveFormsModule } from '@angular/forms'; 
import { MeetingRoomModule } from './meeting-room/meeting-room.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    MeetingRoomModule
]
})
export class PagesModule { }
