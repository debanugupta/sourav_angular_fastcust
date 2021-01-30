import { Component, OnInit, ViewChild } from '@angular/core';

import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerDetail } from '../_models/customerDetail';
import { CustomerAddress } from '../_models/customerAddress';
import { CustomerService } from '../_services/customer.service';
import { AlertifyService } from '../../auth/_services/alertify.service';



@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  public customer: CustomerDetail;
  public customerAddresses: CustomerAddress[];
  customerId: number = null;
  isAddMode: boolean = false;
  errorMessages: string ="";
  mode: string= "";
  isLoading: boolean = false;
  
  constructor(private customerService: CustomerService,
    private actRoute: ActivatedRoute, private router: Router,
    private alertify: AlertifyService
    ) { }

  ngOnInit() {
    this.customerId= this.actRoute.snapshot.params.id;

    if (!this.customerId)
    {
      this.isAddMode = true;
      this.mode= "Add";
    }
    else
    {
      this.isAddMode = false;
      this.mode= "Edit";
    }

    if (this.isAddMode == true)
    {
      this.resetCustomer();
    }
    else
    {
      this.getCustomerById(this.customerId);
    }
    
  }

  getCustomerById(customerId: number) {
    this.isLoading = true;
    this.customerService.getCustomersById(customerId)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(customer => {
        this.customer = customer.customer;
        console.log(this.customer);
      }, error => {
        this.errorMessages= "Customer data fetching failed"
        console.log(error);
        console.log(this.errorMessages);
        this.alertify.error(this.errorMessages);
      });
  }

  resetCustomer(){
    this.customer = {
      id: null,
      businessName: '',
      firstName: '',
      lastName: '',
      customerTypeId: null,
      businessNumber: '',
      notes: '',
      website: '',
      phone1: '',
      phone2: '',
      primaryMobile: '',
      secondaryMobile: '',
      email: '',
      isActive: true,
      createdUtc: new Date(),
      createdBy: '',
      lastModifiedUtc: new Date(),
      lastModifiedBy: '',
      myBusinessId: null
    };
  }

  cancel(): void{
    if (!this.isAddMode)
    {
      this.router.navigate(['/customers/' + this.customerId]);
    }
    else
    {
      this.router.navigate(['/customers']);
    }
  }

  save(): void{
    this.customer.customerTypeId=1;
    if (this.isAddMode)
    {
      this.addCustomer();
    }
    else
    {
      this.updateCustomer();
    }
  }

  updateCustomer() {
    this.isLoading = true;
    this.customerService.updateCustomer(this.customer)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(response => {
        this.alertify.success('Customer updated successfully');
        this.router.navigate(['/customers/' + this.customerId]);
      }, error => {
        this.errorMessages= "Updation failed"
        if(error.error.errors.Email)
        {
          this.errorMessages = this.errorMessages + " | " + error.error.errors.Email[0];
        }
        if(error.error.errors.Phone1)
        {
          this.errorMessages = this.errorMessages + " | " + error.error.errors.Phone1[0];
        }
        if(error.error.errors.PrimaryMobile)
        {
          this.errorMessages = this.errorMessages + " | " + error.error.errors.PrimaryMobile[0];
        }
        console.log(error);
        console.log(this.errorMessages);
        this.alertify.error(this.errorMessages);
      });
    }

  addCustomer() {
    this.isLoading = true;
    this.customerService.addCustomer(this.customer)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(response => {
        this.alertify.success('Customer added successfully');
        this.router.navigate(['/customers']);
      }, error => {
        this.errorMessages= "Adding failed"
        if(error.error.errors.Email)
        {
          this.errorMessages = this.errorMessages + " | " + error.error.errors.Email[0];
        }
        if(error.error.errors.Phone1)
        {
          this.errorMessages = this.errorMessages + " | " + error.error.errors.Phone1[0];
        }
        if(error.error.errors.PrimaryMobile)
        {
          this.errorMessages = this.errorMessages + " | " + error.error.errors.PrimaryMobile[0];
        }
        console.log(error);
        console.log(this.errorMessages);
        this.alertify.error(this.errorMessages);
      });
    }

}
