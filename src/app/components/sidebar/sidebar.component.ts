import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  isMenuOpen = false;
  isBillMenuOpen = false;
  
  constructor(private router: Router) {}
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleBillMenu() {
    this.isBillMenuOpen = !this.isBillMenuOpen;
  }

  goToRoomList() {
    this.router.navigate(['/meeting-room/room-list']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
  // ใน component
  goToExternalUrl(url: string) {
    window.open(url, '_blank');
  }

  goToRoom() {
    this.router.navigate(['/admin-meeting-room/admin-room']);
  }
  goToZone() {
    this.router.navigate(['/admin-meeting-room/admin-zone']);
  }
  goToReserveRoom() {
    this.router.navigate(['/admin-meeting-room/admin-reserve-room']);
  }

}
