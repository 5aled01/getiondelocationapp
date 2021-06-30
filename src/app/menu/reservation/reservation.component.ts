import { AnnonceExterne } from 'src/app/models/annonceExterne';
 
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnnonceInetrne } from 'src/app/models/annonceInterne';
import { Client } from 'src/app/models/client';
import { ProC1 } from 'src/app/models/proc1';
import { Reservation } from 'src/app/models/reservation';
import { AnnonceService } from 'src/app/services/annonce.service';
import { ClientService } from 'src/app/services/client.service';
import { ProrietaireService } from 'src/app/services/proprietaire.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  public reservations!: Reservation[] ;
  public editeReservation: Reservation | undefined;
  public deleteReservation: Reservation | undefined;
  public proprietaires! :ProC1[]; 
  public aInternes!:AnnonceInetrne[];
  public aExternes!:AnnonceExterne[];
  public clients! :Client[];
  public type :string ="interne";
  public dureeEnjour :number =1;
  

  constructor(private prorietaireService: ProrietaireService ,private annonce :AnnonceService ,private clientService :ClientService ,private reservationService :ReservationService) {
   }

  ngOnInit(){
    
    this.getAnnoncesEx();
    this.getAnnoncesIn();
    this.getClient();
    this.getReservation();
  }

  public getReservation(): void {
    this.reservationService.getReservationAll().subscribe(
      (response: Reservation[]) => {
        this.reservations = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getClient(): void {
    this.clientService.getClients().subscribe(
      (response: Client[]) => {
        this.clients = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
 
 
 
  public getAnnoncesIn(): void {
    this.annonce.getAllIn().subscribe(
      (response: AnnonceInetrne[]) => {
        this.aInternes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getAnnoncesEx(): void {
    this.annonce.getAllEx().subscribe(
      (response: AnnonceExterne[]) => {
        this.aExternes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
 
  settype(event :any){
     
    this.type =event.value;
    console.log(event.value)
  }
  
  public onAddReservation(addForm: NgForm): void {
    document.getElementById('add-Reservation-form')?.click();
    const formvalue =addForm.value ;
    let date =new Date();
    console.log(date);
    console.log(date.getDate());
    let days :number = formvalue['duree'];
    if(days== 3)
    date.setDate(date.getDate()+ 3);
    if(days== 2)
    date.setDate(date.getDate()+ 2);
    if(days== 1)
    date.setDate(date.getDate()+ 1);
    const newuser = new Reservation(0,this.type, formvalue['idAnnonce'],
    formvalue['idClient'],new Date(),formvalue['etats'],date);
 
 console.log(date);
    this.reservationService.addReservation(newuser).subscribe(
      (response) => {
        
        console.log(response);
        this.getReservation();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateReservation(reser: Reservation): void {
    document.getElementById('update-Reservation-form')
    ?.click();
    let date =new Date();
    console.log(date);
    console.log(date.getDate());
    let days :number = this.dureeEnjour;
    if(days== 3)
    date.setDate(date.getDate()+ 3);
    if(days== 2)
    date.setDate(date.getDate()+ 2);
    if(days== 1)
    date.setDate(date.getDate()+ 1);
    reser.duree=date;
    this.reservationService.updateReservation(reser).subscribe(
      (response: Reservation) => {
        console.log(response.date);
        this.getReservation();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
    
  
  public onDeleteReservation(reservID: number): void {
    this.reservationService.deleteReservation(reservID).subscribe(
      (response: void) => {
        console.log(response);
        this.getReservation();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchUsers(key: string): void {
    console.log(key);
    const results: Reservation[] = [];
    for (const user of this.reservations) {
      if (user?.id.toString().indexOf(key.toLowerCase()) !== -1
     
      || user.idClient.toString().indexOf(key.toLowerCase()) !== -1
       ) {
        results.push(user);
      }
    }
    this.reservations = results;
    if (!key) {
      this.getReservation();
    }
  }

  public onOpenModal(user: Reservation, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addReservationModal');
    }
    if (mode === 'edit') {
      this.editeReservation = user;
      this.type=this.editeReservation.type;
      button.setAttribute('data-target', '#updateReservationModal');
    }
    if (mode === 'delete') {
      this.deleteReservation = user;
      button.setAttribute('data-target', '#deleteReservationModal');
    }
    container?.appendChild(button)
    button.click();
 }
 deleteReservations(idannonce:number ,id:number) {
  this.reservationService.deleteReservationByAnnonce( idannonce, id).subscribe(
    (response)=>{
      this.getReservation();
    },(error :HttpErrorResponse)=>{
      alert(error.message);
    }
  )
}
updateEtats(type: string, idAnnonce: number) {
  this.getAnnoncesEx();
  if(type=="interne"){
    this.annonce.updateAnnonceInterneEtats(idAnnonce).subscribe(
      (respons)=>{

      },
      (error:HttpErrorResponse) =>{
        alert(error.message);
      }
        ); }
     
      
  if(type=="externe"){
    
    this.annonce.updateAnnonceExternEtats(idAnnonce).subscribe(
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
 

}
