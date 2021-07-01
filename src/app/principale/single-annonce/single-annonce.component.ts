import { AnnonceExterne } from 'src/app/models/annonceExterne';

 
import { EtageService } from './../../services/etage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ContratVente } from './../../models/contratVente';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ContratLocationService } from 'src/app/services/contrat-location.service';
import { ContratVenteService } from 'src/app/services/contratVente.service';
import { ImmobilierBatiService } from 'src/app/services/immobilierBati.service';
import { AnnonceService } from 'src/app/services/annonce.service';
import { ImmobilierBati } from 'src/app/models/ImmobilierBati';
import { AnnonceInetrne } from 'src/app/models/annonceInterne';
import { ContratLocation } from 'src/app/models/contratLocation';
import { Etage } from 'src/app/models/etage';
import { Image } from 'src/app/models/image';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-single-annonce',
  templateUrl: './single-annonce.component.html',
  styleUrls: ['./single-annonce.component.css']
})
export class SingleAnnonceComponent implements OnInit {

  public immobilierBati! : ImmobilierBati;
  public annonceInetrne! : AnnonceInetrne;
  public annonceExetrne! : AnnonceExterne;
  public contratLocation! : ContratLocation;
  public contratVente! : ContratVente;
  public etages! : Etage[];
  public images!:Image[];
  public imagesEtage!:Image[];
  public imageCurentImmobilier!: any;

  constructor(private route :ActivatedRoute ,private contratLocationService:ContratLocationService ,private contratVenteService :ContratVenteService,
             private immageService :ImageService, private immobilierBatiService:ImmobilierBatiService,private annonceService:AnnonceService ,private etageService :EtageService) { }

  ngOnInit(): void {
      const idImmobilier =this.route.snapshot.params["idImmobilier"];
      const idAnnonce =this.route.snapshot.params["idAnnonce"];
      const typeAnnonce =this.route.snapshot.params["typeAnnonce"];
      this.getImmobilier(2);
      this.getAnnonce(4,'Externe');
      this.getImages(2);
      
      
  }
  
  public getImageEtage(id :number){
    const results: Image[] = [];
      
      for(let imag of this.images){
        if(imag.corespondance==''+id){
          results.push(imag);
        }
      }
      this.imagesEtage=results;
      
  }

  getImages(idImmobilier: any) {
   this.immageService.getImagesOfBatiment(idImmobilier).subscribe(
     (response:Image[])=>{
       this.images=response;
       this.imageCurentImmobilier=response[0].image
       console.log(response)
     },(error:HttpErrorResponse)=>{
       alert(error.message);
     }
   )
  }
  public getImage(image :any) {
    const retrievedImag = 'data:image/jpeg;base64,' + image;
    console.log(retrievedImag);
    return retrievedImag;
  }

  getAnnonce(idAnnonce: number, typeAnnonce: string) {
     if(typeAnnonce=='Externe'){
        this.annonceService.getAnnonceExterne(idAnnonce).subscribe(
          (response :AnnonceExterne)=>{
             this.annonceExetrne=response;
          },(error:HttpErrorResponse)=>{
            alert(error.message);
          }
        )
     }
     if(typeAnnonce=='Interne'){
        this.annonceService.getAnnonceInterne(idAnnonce).subscribe(
          (response :AnnonceInetrne)=>{
            this.annonceInetrne=response;
            if(response.type=='Location'){
               this.getcontratLocation(response.idContrat);
            }
            if(response.type=='Vente'){
              this.getcontratVente(response.idContrat);
           }
          },
          (error:HttpErrorResponse)=>{
            alert(error.message);
          }
        )
     }
  }
  getcontratVente(idContrat: number) {
     this.contratVenteService.getContratVente(idContrat).subscribe(
       (response:ContratVente)=>{
         this.contratVente=response;
       },(error:HttpErrorResponse)=>{
         alert(error.message)
       }
     )
  }
  getcontratLocation(idContrat: number) {
    this.contratLocationService.getContratLocation(idContrat).subscribe(
      (response:ContratLocation)=>{
        this.contratLocation=response
      },(error:HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }
  getImmobilier(idImmobilier: number) {
    this.immobilierBatiService.getImmobilierBati(idImmobilier).subscribe(
      (response : ImmobilierBati)=>{
        this.immobilierBati=response;
        this.getEtage(response.id);
      },
      (error :HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }
  getEtage(id: number) {
    this.etageService.getEtages(id).subscribe(
      (response : Etage[])=>{
       this.etages=response;
      },(error :HttpErrorResponse)=>{
        alert(error.message)
      }
    )
    
  }


}
