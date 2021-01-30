import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterModule } from '@angular/router';
import { appRoutes } from './app-routing.module';
import { HomeComponent } from './modules/home/home.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RegisterComponent } from './modules/auth/register/register.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OrderModule } from 'ngx-order-pipe';
import { NavLeftMenuComponent } from './modules/nav-left-menu/nav-left-menu.component';
import { CustomerListComponent } from './modules/customers/customer-list/customer-list.component';
import { CustomerDetailComponent } from './modules/customers/customer-detail/customer-detail.component';
import { CustomerEditComponent } from './modules/customers/customer-edit/customer-edit.component';
import { CustomerAddressEditComponent } from './modules/customers/customer-address-edit/customer-address-edit.component';
import { NavComponent } from './modules/nav/nav.component';

export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [	
    AppComponent,
    HomeComponent,
    NavComponent,
    RegisterComponent,
    NavLeftMenuComponent,
    LoginComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    CustomerEditComponent,
    CustomerAddressEditComponent,
      
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BrowserAnimationsModule,
    MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule,
    MatCheckboxModule, MatDatepickerModule, MatRadioModule, MatSelectModule,
     MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule,
     MatProgressBarModule,
     OrderModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5001'],
        disallowedRoutes: ['localhost:5001/api/auth']
      }
    })
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
