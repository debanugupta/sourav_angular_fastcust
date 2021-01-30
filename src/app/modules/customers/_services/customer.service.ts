import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Country } from '../../auth/_models/country';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { CustomerDetail } from '../_models/customerDetail';
import { CustomerAddress } from '../_models/customerAddress';


@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  baseUrl = environment.apiUrl;



  constructor(private http: HttpClient) { }

  

  getCustomers(name: string, phone: string): Observable<any> {
    return this.http.get(this.baseUrl + `Customers/get-customers?Name=${name}&Phone=${phone}`);
  }

  getCustomersById(customerId: number): Observable<any> {
    return this.http.get(this.baseUrl + `Customers/get-customer?CustomerId=${customerId}`);
  }

  updateCustomer(customer: CustomerDetail): Observable<any> {
    return this.http.put(this.baseUrl + 'Customers/update-Customer', customer);
  }

  updateCustomerAddressPrimary(customerAddress: CustomerAddress): Observable<any> {
    return this.http.put(this.baseUrl + 'Customers/set-customer-primary-address', customerAddress);
  }


  addCustomer(customer: CustomerDetail): Observable<any>{
    return this.http.post(this.baseUrl + 'Customers/add-customer', customer);
  }

  getCustomerAddressesById(customerId: number): Observable<any> {
    return this.http.get(this.baseUrl + `Customers/get-customer-addresses?CustomerId=${customerId}`);
  }

  updateCustomerAddress(customerAddress: CustomerAddress): Observable<any> {
    return this.http.put(this.baseUrl + 'Customers/update-customer-address', customerAddress);
  }

  addCustomerAddress(customerAddress: CustomerAddress): Observable<any>{
    return this.http.post(this.baseUrl + 'Customers/add-customer-address', customerAddress);
  }

  getCustomerActivities(customerId: number): Observable<any> {
    return this.http.get(this.baseUrl + `Customers/get-customer-activities?CustomerId=${customerId}`);
  }
}



