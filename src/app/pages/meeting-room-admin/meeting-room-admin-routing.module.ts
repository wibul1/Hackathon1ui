import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './room/room.component';
import { ZoneComponent } from './zone/zone.component';
import { ReserveRoomComponent } from './reserve-room/reserve-room.component';

const routes: Routes = [
  {
    path: 'admin-room',
    component: RoomComponent,
  },
  {
    path: 'admin-zone',
    component: ZoneComponent,
  },
  {
    path: 'admin-reserve-room',
    component: ReserveRoomComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingRoomAdminRoutingModule { }
