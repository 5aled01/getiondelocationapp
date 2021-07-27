import { PrincipaleComponent } from './../principale.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceExterne } from 'src/app/models/annonceExterne';
import { AnnonceInetrne } from 'src/app/models/annonceInterne';
import { ContratLocation } from 'src/app/models/contratLocation';
import { ContratVente } from 'src/app/models/contratVente';
import { Image } from 'src/app/models/image';
import { ImmobilierBati } from 'src/app/models/ImmobilierBati';
import { AnnonceService } from 'src/app/services/annonce.service';
import { AnnoncesService } from 'src/app/services/annonces.service';
import { ContratLocationService } from 'src/app/services/contrat-location.service';
import { ContratVenteService } from 'src/app/services/contratVente.service';
import { ImageService } from 'src/app/services/image.service';
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
  public contratLocations!: ContratLocation[];
  public contratVentes!: ContratVente[];
  public currentAnnonce! : String;
  public typeAnnonce!: string;

  public markers = [

      {

          lat: 0,

          lng: 0,

          label: '',

          id: 0

      }
  ];

  
  
 public location!: { lat: number; lng: number; label: string; id: number} ;
  images!: Image[];
  img!: any;
  idTest!: string;


  constructor(private immobilierBatiService :ImmobilierBatiService,
    private annonceService :AnnonceService,
    private imageService: ImageService ,
    private contratLocationService:ContratLocationService,
    private contratVenteService :ContratVenteService,private router :Router,
    private principale :PrincipaleComponent) { 
   
  }

 
  ngOnInit(): void {
     this.principale.ngOnInit();
      this.getImmobilierBatisAnnonce();
      this.getImagesAnnonced();
      this.getAnnonceExternes();
      this.getAnnonceInternes();
      this.getContratLocations();
      this.getContratVentes();
  }


  public getImage(id :number){
for(let image of this.images){
if(image.idCorespondance == id){
  this.img = image.image ;
}
    }
    const base64Data = this.img;
    this.img = null;
    const retrievedImage = 'data:image/jpeg;base64,' + base64Data;
    return retrievedImage;
    
    
  }
//contra location , contra vente  


  getImmobilierBatisAnnonce() {
    this.immobilierBatiService.getImmobilierBatisAnnonce().subscribe(

      (response : ImmobilierBati[])=>{
        this.immobilierBatis =response ;
        for(let immobilierBati of this.immobilierBatis){
          this.location = { lat: immobilierBati.localisation.x,
             lng: immobilierBati.localisation.y,
             label : immobilierBati.nom,id :immobilierBati.id} ; 
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


  getContratLocations() {
    this.contratLocationService.getContratLocations().subscribe(

     (response : ContratLocation[])=>{
       this.contratLocations =response ;
     },
     (error: HttpErrorResponse) => {
       alert(error.message);
     }
    );
 }
 getContratVentes() {
   this.contratVenteService.getContratVentes().subscribe(

    (response : ContratVente[])=>{
      this.contratVentes =response ;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
   );
}
 
  public showImmobilierBati(id: any){

    document.getElementById(id)!.scrollIntoView({behavior: 'smooth'});
    document.getElementById(id)!.style.boxShadow ='0 0 2px 1px rgba(1, 4, 5, 0.5)';
    document.getElementById(this.idTest)!.style.removeProperty("boxShadow");
    this.idTest = id;
      }


      getImagesAnnonced() : void{
        this.imageService.getImagesAnnonced().subscribe(
          (response: Image[]) => {
            this.images = response;
            console.log(response)
           
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }

      getPrixImmobilierBati(id : number,typeProprietaire :string){
        if(typeProprietaire == 'proc1'){
          for(let annonceInterne of this.annonceInternes ){
            if(annonceInterne.idImmobilier == id)
              if(annonceInterne.type == 'Location')
                for(let contratLocation of this.contratLocations){
                 if(contratLocation.id == annonceInterne.idContrat){
                   this.currentAnnonce = annonceInterne.type ;
                   return contratLocation.prixLocation;

                 }
                }
              else
                for(let contratVente of this.contratVentes){
                  if(contratVente.id == annonceInterne.idContrat){
                    this.currentAnnonce = annonceInterne.type ;
                  return contratVente.prixProprietaire;
                }
               }
          
              }
          }
        else{ 
          for(let annonceExterne of this.annonceExternes ){
            if(annonceExterne.idImmobilier == id){
            this.currentAnnonce = annonceExterne.type ;
               return annonceExterne?.prxiImmobilier;  
            }
          }
         
        }
            return 'ERROR'; 
      }

      getIdAnnonceByIdImmobilier(id : Number,typeProprietaire :string){

        if(typeProprietaire == 'proc1'){
          for(let annonceInterne of this.annonceInternes ){
            if(annonceInterne.idImmobilier == id)
            return annonceInterne.id;

      }}else{
        for(let annonceExterne of this.annonceExternes ){
          if(annonceExterne.idImmobilier == id)
          return annonceExterne.id;
      }
      }
      return 0;
    }


   public   onViewImmobilierBati(id : Number,typeProprietaire :string) {
        const idAnnonce = this.getIdAnnonceByIdImmobilier(id,typeProprietaire);
        if(typeProprietaire == 'proc1')
        this.typeAnnonce = 'Interne';
        else
        this.typeAnnonce = 'Externe';
        console.log("cliked")
       this.router.navigate(['/principale','singleannonce',id,idAnnonce,this.typeAnnonce]); 
      }

}
