 
import { HttpErrorResponse } from '@angular/common/http';
import { LocationService } from 'src/app/services/location.service';
import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/models/Location';
import { ContratLocation } from 'src/app/models/contratLocation';
import { Terrian } from 'src/app/models/terrein';
import { ImmobilierBati } from 'src/app/models/ImmobilierBati';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { ImmobilierBatiService } from 'src/app/services/immobilierBati.service';
import { ContratLocationService } from 'src/app/services/contrat-location.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
 public locations!: Location[]; 
 public editeLocation!: Location;
 public deleteLocation!: Location ;
 public type! :string
 public contratLocations!: ContratLocation[];
 public terrains!:Terrian[];
 public batiments !: ImmobilierBati[]
 public clients !: Client[]
  constructor(private clientService: ClientService,private immobilierBatiService :ImmobilierBatiService, private locationService :LocationService ,private contratLocationService :ContratLocationService) { }

  ngOnInit(): void {
    this.getLocation();
    this.getcontrat();
    this.getClient();
    this.getBatiment();
  }
 getBatiment() {
   this.immobilierBatiService.getImmobilierBatispc1().subscribe(
     (response:ImmobilierBati[])=>{
       this.batiments=response;
     },(error:HttpErrorResponse)=>{
       alert(error.message);
     }
   )
 }
 public getClient() {
   this.clientService.getClients().subscribe(
     (response:Client[])=>{
       this.clients=response;
     },(error:HttpErrorResponse)=>{
       alert(error.message);
     }
   )
 }
 public getcontrat() {
  this.contratLocationService.getContratLocations().subscribe(
    (response:ContratLocation[])=>{
      this.contratLocations=response;
    },(error:HttpErrorResponse)=>{
      alert(error.message);
    }
  )
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
  public onAddLocation(form :NgForm){
    document.getElementById('add-Location-form')?.click();
    const formValue=form.value;

    const location =new Location(0,formValue['idClient'], formValue['dateDebut'],formValue['dateFin'],formValue['montEncais'],formValue['idcontratLocalition'], formValue['id_immobilier'],'batiment')
    this.locationService.addLocation(location).subscribe(
      (response)=>{
        this.getLocation()
      },(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }
  public onUpdateLocation(vente : Location){
    this.locationService.updateLocation(vente).subscribe(
     (response)=>{
        console.log(response);
        this.getLocation()
     },(error:HttpErrorResponse)=>{
       alert(error.message);
     }
   )
  }
  onDeleteLocation(idVente :number){
   this.locationService.deleteLocation(idVente).subscribe(
     (response)=>{
       this.getLocation()
     },(error:HttpErrorResponse)=>{
       alert(error.message);
     }
   )
  }

 public onOpenModal(location : Location , mode : string):void{

  
   const container = document.getElementById('main-container');
   const button = document.createElement('button');
   button.type = 'button';
   button.style.display = 'none';
   button.setAttribute('data-toggle', 'modal');
   if (mode === 'add') {
     button.setAttribute('data-target', '#addLocationModal');
   }
   if (mode === 'edit') {
     this.editeLocation = location;
     button.setAttribute('data-target', '#updateLocationModal');
   }
   if (mode === 'delete') {
     this.deleteLocation = location;
     button.setAttribute('data-target', '#deleteLocationModal');
   }
   container?.appendChild(button)
   button.click();
 }

}
