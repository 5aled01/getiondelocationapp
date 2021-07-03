
import { ImmobilierBatiService } from './../../services/immobilierBati.service';
import { AnnonceService } from './../../services/annonce.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { ProC2 } from 'src/app/models/proc2';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

import { ReservationService } from 'src/app/services/reservation.service';
 
import { Reservation } from 'src/app/models/reservation';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { ImmobilierBati } from 'src/app/models/ImmobilierBati';
import { Image } from 'src/app/models/image';
import { ImageService } from 'src/app/services/image.service';
import { AnnonceExterne } from 'src/app/models/annonceExterne';
import { ProrietaireService } from 'src/app/services/proprietaire.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private apiServerUrl = environment.apiBaseUrl ;
  ProC2Connect!: ProC2;
  public demandeReservations! :Reservation[];
  public clients!:Client[];
  public currentClient?: Client;
  public onAfficheDemande:boolean= true;
  public immobilierCurentProc2!:ImmobilierBati[];
  public imgages! : Image[] ;
  public curentimage! :string ;
  public imgcurentproc2:any;
  public annonceImmobProc2! :AnnonceExterne[]
  public curentimmobilierbati!: ImmobilierBati;
  public editeProC2!: ProC2;
  selectedFile: any;
  
 public  nbrDemande!: number;
  public currentAnnonce!: AnnonceExterne;
  constructor(private proprietaireService :ProrietaireService ,  private clientService :ClientService ,private route :ActivatedRoute, private router: Router,public authservice : AuthService,private http: HttpClient,private reservationService :ReservationService ,
    private annonceService :AnnonceService ,private immobilierBatiService:ImmobilierBatiService ,private imageService :ImageService  ) { 
      this.nbrDemande = +(Cookie.get('nbrDemande'));
      
    }

  
  ngOnInit(): void {
          this.signInProC2(Cookie.get('username') ,Cookie.get('password'));
          const id = this.route.snapshot.params['id'];
          this.getReservation(id);
          this.getimmobilierbatiProc2( id);
          this.getImages( id);
          this.getAnnonce( id);
          this.getClients();  
    this.nbrDemande = +(Cookie.get('nbrDemande'));
         
  }
  getimmob(id:number){
    for(let annonce of this.annonceImmobProc2){
      if(annonce?.id==id){
        for(let immoblierbati of this.immobilierCurentProc2){
          if(immoblierbati.id=annonce.idImmobilier){
            this.curentimmobilierbati =immoblierbati;
            break;
          }
        }
        break;
      }
    }
  }
  getAnnonce(id :number){
    this.annonceService.getAnnonceExterneProc2(id).subscribe(
      (response :AnnonceExterne[])=>{
        this.annonceImmobProc2=response
      },(error:HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }

  getImages(id : number) : void{
    this.imageService.getImagesBatiCurentProc2(id).subscribe(
      (response: Image[]) => {
         this.imgages=response;
         console.log(response);
        }
       
    ),
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
  };
  public getImage2() {
    const retrievedImag = 'data:image/jpeg;base64,' + this.imgcurentproc2;
    console.log(retrievedImag);
    return retrievedImag;
  }

  getimmobilierbatiProc2(id :number) {
    this.immobilierBatiService.getImmobilierBatiscurentpc2(id).subscribe(
      (response : ImmobilierBati[])=>{
        this.immobilierCurentProc2=response
          
          
        console.log(response);
      },(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }
  opendemande(bo :boolean){
    if(bo==true){
         Cookie.set('nbrDemande',''+this.demandeReservations.length);
        this.nbrDemande=this.demandeReservations.length;
    } 
      
    this.onAfficheDemande =bo ;
  }
  setcurrentAnnonce(demandereserv :Reservation){
       
        for(let annonceExtern of this.annonceImmobProc2)
      {
        if(annonceExtern.id==demandereserv.idAnnonce){
          this.currentAnnonce=annonceExtern;
        }
      }
  }
  signInProC2(pronom: string, password: string) {
    return new Promise <void>((response, reject) => {
      this.http.get<ProC2>(`${this.apiServerUrl}/proc2/find/${pronom}&${password}`)
        .toPromise()
        .then(
          (response: ProC2) => {  
            this.ProC2Connect = response;
            this.imgcurentproc2=response.img;
          },
          (error) => {
            alert(error.message);
          }
        );
    });
    
  }

  public getImage(id:number){
    for(let img of this.imgages){
       if(img.idCorespondance==id){
      
      const retrievedImage = 'data:image/jpeg;base64,' + img.image;
       return retrievedImage;
      
       }
      
    }
    return 0;
  }

  onSignOut() {
    this.authservice.signOutProC2();
   }
   getReservation(id :number){
    this.reservationService.getProC2Reservation(id).subscribe(
      (response :Reservation[])=>{
        this.demandeReservations=response;
        
        console.log(response);
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )
 }
 public onDeleteReservation(reservID: number): void {
  this.reservationService.deleteReservation(reservID).subscribe(
    (response: void) => {
      console.log(response);
      this.getReservation(this.ProC2Connect?.id);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
 getClients(){
this.clientService.getClients().subscribe(
  (response:Client[])=>{
     this.clients=response;
  },(error:HttpErrorResponse)=>{
    alert(error.message)
  }
)
 }
 getclient(id :number):void{
   for(let client of this.clients){
     if(client.id==id){
       this.currentClient=client;
       break;
     }
   }
 }

 updateEtats(type: string, idAnnonce: number) {
 
  if(type=="interne"){
    
    this.annonceService.updateAnnonceInterneEtats(idAnnonce).subscribe(
      (respons)=>{

      },
      (error:HttpErrorResponse) =>{
        alert(error.message);
      }
        ); }
       
  if(type=="externe"){
    this.annonceService.updateAnnonceExternEtats(idAnnonce).subscribe(
      (respons)=>{

      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
        );
  }}
 
 public onAccepte(resevation :Reservation){
      resevation.etats="Accepte";
      this.reservationService.updateReservation(resevation).subscribe(
        (response :Reservation )=>{
          this.updateEtats(resevation?.type,resevation?.idAnnonce);
        },(eror:HttpErrorResponse)=>{
          alert("La reservation n'est pas accepter")
        }
        );

        this.deleteReservations(resevation?.idAnnonce,resevation?.id);
      
     
 }
 deleteReservations(idannonce:number ,id:number) {
  this.reservationService.deleteReservationByAnnonce( idannonce, id).subscribe(
    (response)=>{
      this.getReservation(this.ProC2Connect?.id);
    },(error :HttpErrorResponse)=>{
      alert(error.message);
    }
  )
}
public onFileChanged(event:any) {
  this.selectedFile = event.target.files[0];
}
public onOpenModal2(proC2: ProC2, mode: string): void {
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
   
  if (mode === 'edit') {
    this.editeProC2 = proC2;
    button.setAttribute('data-target', '#updateProC2Modal');
  }
  
  container?.appendChild(button)
  button.click();
}
public onUpdateProC2(proC2: ProC2): void {
  document.getElementById('update-ProC2-form')?.click();
  const uploadImage = new FormData()
  if(this.selectedFile){
  uploadImage.append('imageFile', this.selectedFile ,this.selectedFile.name);
    proC2.img=null;
  uploadImage.append('proC2', JSON.stringify(proC2));
  this.proprietaireService.updateProC2Withimg(uploadImage).subscribe(
    (response: ProC2) => {
     this.onSignOut();
       
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
else{
  
  proC2.img=null;
uploadImage.append('proC2', JSON.stringify(proC2));
this.proprietaireService.updateProC2(uploadImage).subscribe(
  (response: ProC2) => {
    this.onSignOut();
  },
  (error: HttpErrorResponse) => {
    alert(error.message);
  }
)
}
}
  
}
