import { Component ,ViewChild, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  @ViewChild('sidebar') sidebar?: SidebarComponent;

  constructor(private router: Router) {}

  title = 'meeting-room';

  // ตรวจสอบว่าหน้าปัจจุบันคือ Login หรือไม่
  isLoginPage(): boolean {
    return this.router.url.startsWith('/login');
  }

  // ใช้สำหรับตรวจสอบ Sidebar หลังจากโหลด View
  ngAfterViewInit(): void {
    // console.log('Sidebar component:', this.sidebar);
  }
}
