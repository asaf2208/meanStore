import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BACKEND_URL = 'http://localhost:3000/branches/';
@Injectable({
  providedIn: 'root'
})
export class BranchesService {
    getCities(): any {
   
        return this.http.get<{ cities: string[] }>(BACKEND_URL + 'city');
 
  }
  

  constructor(private http: HttpClient) {}
  branches : any;
  getAllBranches()
  {
   
    return this.http.get<{branches : any[]}>('http://localhost:3000/branches');
  }

  getEntiresCity(city:string) {
    return this.http.get<{ count : number  }>('http://localhost:3000/branche/postCounter/'+city);
  }
}
