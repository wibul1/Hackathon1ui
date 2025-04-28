import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RoomCardComponent } from './room-card/room-card.component';
import { TextBoxComponent } from './text-box/text-box.component';
import { FormsModule } from '@angular/forms';
import { DatatableComponent } from './datatable/datatable.component'; // Import FormsModule if needed

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    RoomCardComponent,
    TextBoxComponent,
    DatatableComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    RoomCardComponent,
    TextBoxComponent,
    DatatableComponent
  ]
})
export class ComponentsModule { }
