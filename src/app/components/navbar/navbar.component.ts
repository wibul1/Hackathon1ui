import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isDropdownOpen: boolean = false;
  userProfile: any;

  constructor(
    private router: Router,) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    // if (this.authService.isLoggedIn()) {
    //   this.authService.getUserProfile().subscribe({
    //     next: (profile) => {
    //       this.userProfile = profile;
    //       // console.log('User profile loaded:', profile);
    //     },
    //     error: (error) => {
    //       // console.error('Error loading profile:', error);
    //       this.router.navigate(['/login']);
    //     }
    //   });
    // } else {
    //   this.router.navigate(['/login']);
    // }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    // this.authService.logout().subscribe({
    //   next: () => {
    //     this.router.navigate(['/login']);
    //   },
    //   error: () => {
    //     this.router.navigate(['/login']);
    //   }
    // });
    // this.isDropdownOpen = false;
  }
  

  onClickOutside() {
    this.isDropdownOpen = false;
  }

}
