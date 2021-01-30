import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CountryService } from '../_services/country.service';
import { Country } from '../_models/country';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  countries: Observable<Country[]>;
  isLoading = false;
  errorMessages: string = "";

  constructor(private authService: AuthService, private router: Router,
    private alertify: AlertifyService, private fb: FormBuilder,
    private countryService: CountryService,
    ) { }

  ngOnInit() {
    this.createRegisterForm();
    this.fillCountries();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      businessName: [''],
      countryId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      confirmPassword: ['', Validators.required]
    }, {validators: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  // register() {

  //   if (this.registerForm.valid) {
  //     this.isLoading = true;
  //     this.user = Object.assign({}, this.registerForm.value);
  //     this.authService.register(this.user).subscribe(response => {
  //       console.log(response);
  //       this.isLoading = false;
  //       this.alertify.success('Registration successful');
  //       this.user.userName = this.user.email;
  //     }, error => {
  //       console.log(error);
  //       console.log(error.error);
  //       this.alertify.error(error.error);
  //     }, () => {
  //       this.authService.login(this.user).subscribe(() => {
  //         this.router.navigate(['/home']);
  //         this.cancelRegister.emit(false);
  //       });
  //     });
  //   }
  // }

  register(): void{
    if (this.registerForm.valid) {
    this.isLoading = true;
    this.user = Object.assign({}, this.registerForm.value);
    
    this.authService.register(this.user)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(response => {
        console.log(response);
        this.alertify.success('Registration successful');
        this.user.userName = this.user.email;
        this.login();
      }, error => {
        this.errorMessages= "Registration failed"
        console.log(error);
        this.alertify.error(this.errorMessages);
      });
    }
  }

  login(): void{
    this.isLoading = true;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.login(this.user)
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

  fillCountries(){
    this.countries = this.countryService.getCountries();
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  signIn(): void {
    this.router.navigate(['/login']);
  }

}

