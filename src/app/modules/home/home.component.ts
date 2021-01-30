import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;

  constructor(private http: HttpClient,public authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    // if(!this.loggedIn()){
    //   this.router.navigate(['/login']);
    // }
  }

  // loggedIn(): boolean {
  //   return this.authService.loggedIn();
  // }

  

}
