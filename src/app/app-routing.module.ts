import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
const routes: Routes = [
  { path: '',redirectTo: 'home', pathMatch:'full'},
  { path: 'home', component: HomeComponent },
  {
    path: 'meeting-room',
    loadChildren: () =>
      import('src/app/pages/meeting-room/meeting-room.module').then(
        (m) => m.MeetingRoomModule,
      ),
  },
  {
    path: 'admin-meeting-room',
    loadChildren: () =>
      import('src/app/pages/meeting-room-admin/meeting-room-admin.module').then(
        (m) => m.MeetingRoomAdminModule,
      ),
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
