import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Country } from '../_models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  baseUrl = environment.apiUrl;
  countries: Country[] = [];


  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    if (this.countries.length > 0) { return of(this.countries); }
    return this.http.get<Country[]>(this.baseUrl + 'Addresses/public-countries').pipe(
      map(countries => {
        this.countries = countries;
        return countries;
      })
    );
  }
}
