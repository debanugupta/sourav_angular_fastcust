import {Routes} from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AuthGuard } from './modules/auth/_services/auth.guard';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { CustomerListComponent } from './modules/customers/customer-list/customer-list.component';
import { CustomerEditComponent } from './modules/customers/customer-edit/customer-edit.component';
import { CustomerDetailComponent } from './modules/customers/customer-detail/customer-detail.component';
import { CustomerAddressEditComponent } from './modules/customers/customer-address-edit/customer-address-edit.component';

export const appRoutes: Routes = [


    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: '', component: LoginComponent},
    
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [

            { path: 'home', component: HomeComponent},
            { path: 'customers', component: CustomerListComponent},
            { path: 'customers/add', component: CustomerEditComponent},
            { path: 'customers/:id', component: CustomerDetailComponent },
            { path: 'customers/edit/:id', component: CustomerEditComponent},
            { path: 'customers/address/add/:customerId',  component: CustomerAddressEditComponent},
            { path: 'customers/address/edit/:customerId/:id', component: CustomerAddressEditComponent},
            
        ]
    },
    
    { path: '**', redirectTo: '', pathMatch: 'full'}

];
