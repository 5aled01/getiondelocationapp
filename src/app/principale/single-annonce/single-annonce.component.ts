import { AnnonceExterne } from 'src/app/models/annonceExterne';

 
import { EtageService } from './../../services/etage.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
import { Cookie } from 'ng2-cookies';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-annonce',
  templateUrl: './single-annonce.component.html',
  styleUrls: ['./single-annonce.component.css']
})
export class SingleAnnonceComponent implements OnInit {
  private apiServerUrl = environment.apiBaseUrl ;
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
  isAuth: boolean = false;
  clientconncte!: Client;
  
  public lat = 0;
  public long = 0;
  public label = '';
  public zoom=7;

  constructor(private route :ActivatedRoute ,private contratLocationService:ContratLocationService ,private contratVenteService :ContratVenteService,
             private immageService :ImageService, private immobilierBatiService:ImmobilierBatiService,private annonceService:AnnonceService ,private etageService :EtageService,
             private clientService:ClientService,private reservationService:ReservationService,private http: HttpClient) { }

  ngOnInit(): void {
      const idImmobilier =this.route.snapshot.params["idImmobilier"];
        this.idAnnonce =this.route.snapshot.params["idAnnonce"];
        this.typeAnnonce =this.route.snapshot.params["typeAnnonce"];
       
      this.getImmobilier(idImmobilier);
      this.getAnnonce(this.idAnnonce,this.typeAnnonce);
      this.getImages(idImmobilier);
      if(Cookie.get('isAuth') == 'false')
         this.isAuth = false;
      else
       if(Cookie.get('isAuth') == 'true'){
          this.isAuth = true;
            this.signInClient(Cookie.get('nom') ,Cookie.get('password'));
      }else
        this.isAuth = false;

        
        
  }



  

  signInClient(username: string, password: string) {  
      return new Promise <void>((response, reject) => {
        this.http.get<Client>(`${this.apiServerUrl}/client/find/${username}&${password}`)
          .toPromise()
          .then(
            (response: Client) => {  
          
              this.clientconncte = response;
            },
            (error) => {
              reject(error.message);
              
            }
          );
      });
    }
  
  public getImageEtage(id :number){
    this.imagesEtage = [];
      
      for(let img of this.images){
        if(img.corespondance==''+id){
          this.imagesEtage.push(img);
        }
      }
  }

  getImages(idImmobilier: any) {
   this.immageService.getImagesOfBatiment(idImmobilier).subscribe(
     (response:Image[])=>{
       this.images=response;
       this.imageCurentImmobilier=response[0].image
       
     },(error:HttpErrorResponse)=>{
       alert(error.message);
     }
   )
  }
  public getImage(image :any) {
    const retrievedImag = 'data:image/jpeg;base64,' + image;
  
    return retrievedImag;
  }

  getAnnonce(idAnnonce: number, typeAnnonce: string) {
     if(typeAnnonce==="Externe"){
        this.annonceService.getAnnonceExterne(idAnnonce).subscribe(
          (response :AnnonceExterne)=>{
             this.annonceExetrne=response;
             this.prixCurentImmobilier=this.annonceExetrne.prxiImmobilier;
             
          },(error:HttpErrorResponse)=>{
            alert(error.message);
          }
        )
     }
     if(typeAnnonce==="Interne"){
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

        this.lat = this.immobilierBati.localisation.x;
        this.long = this.immobilierBati.localisation.y;
        this.label = this.immobilierBati.nom;

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
  
        let date =new Date();
        if(this.dureeDeReservation== 3)
        date.setDate(date.getDate()+ 3);
        if( this.dureeDeReservation== 2)
        date.setDate(date.getDate()+ 2);
        if( this.dureeDeReservation== 1)
        date.setDate(date.getDate()+ 1);
    
        const reservation = new Reservation(0,this.typeAnnonce ,this.idAnnonce,this.clientconncte?.id,new Date(),"en attente",date)
         this.reservationService.addReservation(reservation).subscribe(
           (response)=>{
             alert("La demande a été envoiyée avec succes ");
           },(error:HttpErrorResponse)=>{
             alert(error.message);
           }
         );
        addForm.reset();
     
          }
  
  

  }

