import { HttpErrorResponse } from '@angular/common/http';
import { LocationService } from 'src/app/services/location.service';
import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/models/Location';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
 public locations!: Location[]; 
 public editeLocation!: Location;
 public deleteLocation!: Location
  constructor(private locationService :LocationService) { }

  ngOnInit(): void {
    this.getLocation();
    
    
  }
  getLocation() {
  this.locationService.getLocationAll().subscribe(
    (response :Location[])=>{
      this.locations=response;
    },(error:HttpErrorResponse)=>{
      alert(error.message);
    }
  )   
 
  }
 onOpenModal(location : Location , modal : string):void{

  }
}
