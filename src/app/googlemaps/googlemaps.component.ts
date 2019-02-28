import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {BranchesService} from '../branches/barnch.service'
import { HttpClient } from '@angular/common/http';
import {CordinatesService} from '../googlemaps/cordinates.service'
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';


@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.css']
})
export class GooglemapsComponent implements OnInit {
  @ViewChild('ngm') gmapElement: any;

  lat = 0;
  lng = 0;
  zoom = 1;
  cities : string[];
  markers : MarkerI[];
  constructor(public brancheService: BranchesService,private http: HttpClient, private cordService: CordinatesService) {}
  ngOnInit() {
    this.brancheService.getCities().subscribe((data)=>{this.cities = data.cities;
      this.markers = [];
      this.cities.forEach(c => {
        this.cordService.getCord(c).subscribe((data)=>this.markers.push({let: data.location.lat, lng: data.location.lng}));
        
        
       
        
       });

       
    });
  
  
  }
  
  
  
  
}
interface MarkerI {
  let: string;
  lng: string;
}