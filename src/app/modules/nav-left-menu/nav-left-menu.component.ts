import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../auth/_services/alertify.service';
import { AuthService } from '../auth/_services/auth.service';

@Component({
  selector: 'app-nav-left-menu',
  templateUrl: './nav-left-menu.component.html',
  styleUrls: ['./nav-left-menu.component.css']
})
export class NavLeftMenuComponent implements OnInit {
  model: any = {};

  constructor(public authService: AuthService, private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit(): void {
  }

  
  loggedIn(): boolean {
    return this.authService.loggedIn();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('Logged out');
    this.router.navigate(['/login']);
  }

}

