import { Component, OnInit, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerAddress } from '../_models/customerAddress';
import { CustomerService } from '../_services/customer.service';
import { AlertifyService } from '../../auth/_services/alertify.service';


@Component({
  selector: 'app-customer-address-edit',
  templateUrl: './customer-address-edit.component.html',
  styleUrls: ['./customer-address-edit.component.scss']
})
export class CustomerAddressEditComponent implements OnInit {
  public customerAddress: CustomerAddress;
  public customerAddresses: CustomerAddress[];
  customerId: number = null;
  customerAddressId: number = null;
  isAddMode: boolean = false;
  errorMessages: string ="";
  mode: string= "";
  isLoading = false;
  
  constructor(private customerService: CustomerService,
    private actRoute: ActivatedRoute, private router: Router,
    private alertify: AlertifyService
    ) { }

  ngOnInit() {
    this.customerId= this.actRoute.snapshot.params.customerId;
    this.customerAddressId= this.actRoute.snapshot.params.id;

    if (!this.customerAddressId)
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
      this.resetCustomerAddress();
    }
    else
    {
      this.getCustomerAddressById(this.customerId, this.customerAddressId);
    }
    
  }

  getCustomerAddressById(customerId: number, customerAddressId: number) {
    this.isLoading = true;
    this.customerService.getCustomerAddressesById(customerId)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(customerAddresses => {
        this.customerAddresses = customerAddresses.addresses.filter(c => c.id == customerAddressId);
        this.customerAddress = this.customerAddresses[0];
        console.log(this.customerAddress);
      }, error => {
        this.errorMessages= "Customer Address data fetching failed"
        console.log(error);
        console.log(this.errorMessages);
        this.alertify.error(this.errorMessages);
      });
  }

  resetCustomerAddress(){
    this.customerAddress = {
      id: null,
      customerId: null,
      name: "",
      addressTypeId: null,
      addressId: null,
      address1: "",
      address2: "",
      city: "",
      county: "",
      stateProvinceId: null,
      countryId: null,
      postCode: "",
      isPrimaryAddress: false,
      fullAddress: "",
      createdUtc: new Date,
      createdBy: "",
      lastModifiedUtc: new Date,
      lastModifiedBy: "",
      myBusinessId: null
    };
  }

  cancel(): void{
    this.router.navigate(['/customers/' + this.customerId]);
  }

  save(): void{
    this.customerAddress.customerId = this.customerId;
    this.customerAddress.addressTypeId=1;
    this.customerAddress.countryId=1;
    this.customerAddress.stateProvinceId =1;
    if (this.isAddMode)
    {
      this.addCustomerAddress();
    }
    else
    {
      this.updateCustomerAddress();
    }
  }

  updateCustomerAddress() {
    this.isLoading = true;
    this.customerService.updateCustomerAddress(this.customerAddress)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(response => {
        this.alertify.success('Customer address updated successfully');
        this.router.navigate(['/customers/' + this.customerId]);
       }, error => {
      this.errorMessages= "Updation failed"
      console.log(error);
      console.log(this.errorMessages);
      this.alertify.error(this.errorMessages);
    });
  }

  addCustomerAddress() {
    this.isLoading = true;
    this.customerService.addCustomerAddress(this.customerAddress)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(response => {
        this.alertify.success('Customer address added successfully');
        this.router.navigate(['/customers/' + this.customerId]);
      }, error => {
            this.errorMessages= "Adding failed"
            console.log(error);
            console.log(this.errorMessages);
            this.alertify.error(this.errorMessages);
      });
  }
}

