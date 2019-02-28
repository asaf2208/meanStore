import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/auth/countries/';
@Injectable({
  providedIn: 'root'
})
export class CordinatesService {
  data : any;

  constructor(private http: HttpClient) {}
  
  getCord(CountryName: string)
  {
   
    return this.http.get<{
      location : {lat : string , lng : string}
      }>(BACKEND_URL + CountryName);
  }
}
