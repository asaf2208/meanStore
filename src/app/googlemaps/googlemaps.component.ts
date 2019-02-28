import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {AuthService} from '../auth/auth.service'
import { HttpClient } from '@angular/common/http';
import {CordinatesService} from '../googlemaps/cordinates.service'
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Marker } from '@agm/core/services/google-maps-types';
import { AgmMarker, MarkerManager } from '@agm/core';
import { markViewDirty } from '@angular/core/src/render3/instructions';

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
  countries : string[];
  markers : MarkerI[];
  constructor(public authService: AuthService,private http: HttpClient, private cordService: CordinatesService) {}
  ngOnInit() {
    this.authService.getCountries().subscribe((data)=>{this.countries = data.countries;
      this.markers = [];
      this.countries.forEach(c => {
        this.cordService.getCord(c).subscribe((data)=>this.markers.push({let: data.location.lat, lng: data.location.lng}));
        
        
       
        
       });

       
    });
  
  
  }
  
  
  
  
}
interface MarkerI {
  let: string;
  lng: string;
}