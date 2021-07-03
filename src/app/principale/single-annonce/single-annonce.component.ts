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
import { ClientService } from 'src/app/services/client.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { NgForm } from '@angular/forms';
import { Client } from 'src/app/models/client';
import { Reservation } from 'src/app/models/reservation';

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
  public prixCurentImmobilier! :number;
  public typeAnnonce!:string;
  public idAnnonce!:number;
  selectedFile: any | Blob;
  public dureeDeReservation! :number;

  constructor(private route :ActivatedRoute ,private contratLocationService:ContratLocationService ,private contratVenteService :ContratVenteService,
             private immageService :ImageService, private immobilierBatiService:ImmobilierBatiService,private annonceService:AnnonceService ,private etageService :EtageService,
             private clientService:ClientService,private reservationService:ReservationService) { }

  ngOnInit(): void {
      const idImmobilier =this.route.snapshot.params["idImmobilier"];
        this.idAnnonce =this.route.snapshot.params["idAnnonce"];
        this.typeAnnonce =this.route.snapshot.params["typeAnnonce"];
       console.log(this.typeAnnonce);
      this.getImmobilier(idImmobilier);
      this.getAnnonce(this.idAnnonce,this.typeAnnonce);
      this.getImages(idImmobilier);
      
      
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
     if(typeAnnonce==="Externe"){
        this.annonceService.getAnnonceExterne(idAnnonce).subscribe(
          (response :AnnonceExterne)=>{
             this.annonceExetrne=response;
             this.prixCurentImmobilier=this.annonceExetrne.prxiImmobilier;
             console.log("annonce afected")
          },(error:HttpErrorResponse)=>{
            alert(error.message);
          }
        )
     }
     if(typeAnnonce==="Interne"){
        this.annonceService.getAnnonceInterne(idAnnonce).subscribe(
          (response :AnnonceInetrne)=>{
            this.annonceInetrne=response;
            console.log("annonce afected");
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
         this.prixCurentImmobilier=this.contratVente.prixProprietaire;
       },(error:HttpErrorResponse)=>{
         alert(error.message)
       }
     )
  }
  getcontratLocation(idContrat: number) {
    this.contratLocationService.getContratLocation(idContrat).subscribe(
      (response:ContratLocation)=>{
        this.contratLocation=response;
        this.prixCurentImmobilier=this.contratLocation.prixLocation;
      },(error:HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }
  getImmobilier(idImmobilier: number) {
    this.immobilierBatiService.getImmobilierBati(idImmobilier).subscribe(
      (response : ImmobilierBati)=>{
        this.immobilierBati=response;
        this.getEtage(this.immobilierBati.id);
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

  public onAddClient(addForm: NgForm): void {
    document.getElementById('add-Client-form')?.click();
    const formvalue =addForm.value ;
    const newuser = new  Client(0,formvalue['nom'],formvalue['prenom'],formvalue['nni'],
    formvalue['telephone'],formvalue['password'], [0]);
 
     newuser.image= null;
  
    this.clientService.addClient1(newuser).subscribe(
      (response :Client) => {
        console.log("client ajouter");
        let date =new Date();
        if(this.dureeDeReservation== 3)
        date.setDate(date.getDate()+ 3);
        if( this.dureeDeReservation== 2)
        date.setDate(date.getDate()+ 2);
        if( this.dureeDeReservation== 1)
        date.setDate(date.getDate()+ 1);
    
        const reservation = new Reservation(0,this.typeAnnonce ,this.idAnnonce,response?.id,new Date(),"en attente",date)
         this.reservationService.addReservation(reservation).subscribe(
           (response)=>{
             alert("La demande a été envoiyée avec succes ");
           },(error:HttpErrorResponse)=>{
             alert(error.message);
           }
         );
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  
  

  }
}
