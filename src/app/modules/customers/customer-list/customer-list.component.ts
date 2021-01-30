import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { Router } from '@angular/router';
import { CustomerList } from '../_models/customerList';
import { CustomerService } from '../_services/customer.service';
import { AlertifyService } from '../../auth/_services/alertify.service';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: CustomerList[];
  phone: string = "";
  name: string = "";
  errorMessages: string ="";
  isLoading: boolean = false;
  constructor(private customerService: CustomerService, private router: Router,
    private alertify: AlertifyService
    ) { }

  ngOnInit() {
    this.getCustomers("","");
  }

  search(name: string, phone: string){
    this.getCustomers(name, phone);
  }

  customerClicked(customer: CustomerList){
    this.router.navigate(['/customers/' + customer.id]);
  }

  getCustomers(name: string, phone: string) {
    this.isLoading = true;
    this.customerService.getCustomers(name, phone)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(customers => {
        this.customers = customers.customers;
        console.log(this.customers);
        
      }, error => {
        this.errorMessages= "Customer data fetching failed"
        console.log(error);
        console.log(this.errorMessages);
        this.alertify.error(this.errorMessages);
      });
  }

  add(): void {
    this.router.navigate(['/customers/add']);
  }
}
