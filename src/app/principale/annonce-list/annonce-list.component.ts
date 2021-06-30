import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AnnonceExterne } from 'src/app/models/annonceExterne';
import { AnnonceInetrne } from 'src/app/models/annonceInterne';
import { ImmobilierBati } from 'src/app/models/ImmobilierBati';
import { AnnonceService } from 'src/app/services/annonce.service';
import { AnnoncesService } from 'src/app/services/annonces.service';
import { ImmobilierBatiService } from 'src/app/services/immobilierBati.service';

@Component({
  selector: 'app-annonce-list',
  templateUrl: './annonce-list.component.html',
  styleUrls: ['./annonce-list.component.css','./annonce-list.component.scss'],
  

})
export class AnnonceListComponent implements OnInit {
  
  
  lat = 18.075973167298347;
  long = -15.97103292091493;
  zoom=13;

  private map!: google.maps.Map;
  public annonceInternes!: AnnonceInetrne[];
  public annonceExternes!: AnnonceExterne[];
  public immobilierBatis! :ImmobilierBati[] ;
 
  public markers = [

      {

          lat: 0,

          lng: 0,

          label: ''

      }
  ];

  
  
 public location!: { lat: number; lng: number; label: string; } ;


  constructor(private immobilierBatiService :ImmobilierBatiService,private annonceService :AnnonceService ) { 
   
  }
 
  ngOnInit(): void {

    this.getImmobilierBatisAnnonce();
 
  
  }

  public getImage(image:any){

    const base64Data = image;
    const retrievedImage = 'data:image/jpeg;base64,' + base64Data;
    return retrievedImage;

  }



  getImmobilierBatisAnnonce() {
    this.immobilierBatiService.getImmobilierBatisAnnonce().subscribe(

      (response : ImmobilierBati[])=>{
        this.immobilierBatis =response ;
        for(let immobilierBati of this.immobilierBatis){
          this.location = { lat: immobilierBati.localisation.x, lng: immobilierBati.localisation.y, label : immobilierBati.nom} ; 
          console.log(immobilierBati);
          this.markers.push(this.location);
          }
          
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
     );  
  }
  

  public getAnnonceExternes(): void {
    this.annonceService.getAllEx().subscribe(
      (response: AnnonceExterne[]) => {
        this.annonceExternes = response;
     
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getAnnonceInternes(): void {
    this.annonceService.getAllIn().subscribe(
      (response: AnnonceInetrne[]) => {
        this.annonceInternes = response;
     
        console.log(this.annonceInternes);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
 
  public showImmobilierBati(label :string){
console.log('ssss');
  }

}
