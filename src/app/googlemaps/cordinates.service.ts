import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const BACKEND_URL = 'http://localhost:3000/branches/';
@Injectable({
  providedIn: 'root'
})
export class CordinatesService {
  data : any;

  constructor(private http: HttpClient) {}
  
  getCord(CityName: string)
  {
   
    return this.http.get<{
      location : {lat : string , lng : string}
      }>(BACKEND_URL + "cord/"+ CityName);
  }
}
