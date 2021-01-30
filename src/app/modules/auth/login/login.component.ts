import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  isLoading = false;
  errorMessages: string ="";

  constructor(public authService: AuthService, private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit(): void {
    if(this.loggedIn() == true)
    {
      this.router.navigate(['/home']);
    }
  }

  login(): void{
    this.isLoading = true;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.login(this.model)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(customers => {
        this.alertify.success('Logged in successfully');
        this.router.navigate(['/home']);
      }, error => {
        this.errorMessages= "Login failed"
        console.log(error);
        this.alertify.error(this.errorMessages);
      });
  }

  loggedIn(): boolean {
    return this.authService.loggedIn();
  }

  logout(): void {
    this.isLoading = true;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.isLoading = false;
    this.router.navigate(['/register']);
  }

}

