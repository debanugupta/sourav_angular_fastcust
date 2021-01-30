import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CustomerDetail } from '../_models/customerDetail';
import { CustomerAddress } from '../_models/customerAddress';
import { CustomerActivity } from '../_models/customerActivity';
import { CustomerService } from '../_services/customer.service';
import { AlertifyService } from '../../auth/_services/alertify.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  public customer: CustomerDetail;
  public customerAddresses: CustomerAddress[];
  public customerActivities: CustomerActivity[];
  customerId: number = null;
  errorMessages: string ="";
  isLoading = false;
  constructor(private customerService: CustomerService,
    private actRoute: ActivatedRoute, private router: Router,
    private alertify: AlertifyService
    ) { }

  ngOnInit() {
    this.customerId= this.actRoute.snapshot.params.id;
    this.getCustomerById(this.customerId);
    this.getCustomerAddressesById(this.customerId);
    this.getCustomerActivities(this.customerId);
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

  getCustomerAddressesById(customerId: number) {
    this.isLoading = true;
    this.customerService.getCustomerAddressesById(customerId)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(customerAddresses => {
        this.customerAddresses = customerAddresses.addresses;
        console.log(this.customerAddresses);
      }, error => {
        this.errorMessages= "Customer address data fetching failed"
        console.log(error);
        console.log(this.errorMessages);
        //this.alertify.error(this.errorMessages);
      });
  }

  getCustomerActivities(customerId: number) {
    this.isLoading = true;
    this.customerService.getCustomerActivities(customerId)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(customerActivities => {
        this.customerActivities = customerActivities.customerActivities;
        console.log(this.customerActivities);
      }, error => {
        this.errorMessages= "Customer address data fetching failed"
        console.log(error);
        console.log(this.errorMessages);
        //this.alertify.error(this.errorMessages);
      });
  }


  updateCustomerAddressPrimary(customerAddress: CustomerAddress) {
    this.isLoading = true;
    customerAddress.addressId = customerAddress.id;
    customerAddress.customerId = this.customerId;
    this.customerService.updateCustomerAddressPrimary(customerAddress)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(response => {
        this.getCustomerAddressesById(this.customerId);
        this.alertify.success('Customer Address set primary updated successfully');
      }, error => {
        this.errorMessages= "Customer Address set primary Updation failed"
        console.log(error);
        this.alertify.error(this.errorMessages);
      });
    }


  editCustomer(): void {
    this.router.navigate(['/customers/edit/' + this.customerId]);
  }

  addCustomerAddress(): void{
    this.router.navigate(['/customers/address/add/' + this.customerId]);
  }

  editCustomerAddress(id: number): void{
    this.router.navigate(['/customers/address/edit/' + this.customerId 
    + '/' + id]);
  }

}
