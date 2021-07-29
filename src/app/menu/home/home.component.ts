 
  
import { NgForm } from '@angular/forms';
import { ContratVenteService } from './../../services/contratVente.service';
import { ContratLocationService } from './../../services/contrat-location.service';
import { AnnonceService } from './../../services/annonce.service';
import { AnnonceInetrne } from 'src/app/models/annonceInterne';
import { AnnonceExterne } from './../../models/annonceExterne';
import { HttpErrorResponse } from '@angular/common/http';
import { ReservationService } from 'src/app/services/reservation.service';
import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation';
import { ContratLocation } from 'src/app/models/contratLocation';
import { Location } from 'src/app/models/Location';
import { LocationService } from 'src/app/services/location.service';
import { ContratVente } from 'src/app/models/contratVente';
import { Vente } from 'src/app/models/vente';
import { VenteService } from 'src/app/services/vente.service';
 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public reservationinternes! :Reservation[];
  public currentReservation!: Reservation;
  public annonceInternes!:AnnonceInetrne[];
  public annonceInterne!:AnnonceInetrne;
  public currentContratLocation!: ContratLocation;
  public currentContratVente!: ContratVente;


  constructor(private venteService:VenteService, private reservationService :ReservationService ,private locationService:LocationService, private annonceService:AnnonceService ,private contratLocationService:ContratLocationService,private contratVenteService:ContratVenteService) { }

  ngOnInit(): void {
    this.getReservation();
    this.getAnnonce();
  }
  getAnnonce() {
      this.annonceService.getAllIn().subscribe(
        (response:AnnonceInetrne[])=>{
          this.annonceInternes=response;
        },(error:HttpErrorResponse)=>{
          alert(error.message);
        }
      )
  }
  getannonce(id :number):AnnonceInetrne{
    for(let annonce of this.annonceInternes){
      if(annonce.id==id){
        return annonce;
      }
     
    }
     return this.annonceInterne;
  }

  getCurrentReservation(id :number){
    for(let reservation of this.reservationinternes){
      if(reservation.id==id){
        return reservation;
      }
     
    }
     return null;
  }
  PasserAuVente(reservation :Reservation){
    this.currentReservation=reservation
    
    const newVente= new Vente(0,new Date(),this.getannonce(reservation.idAnnonce)?.idContrat,0,this.currentReservation.idClient,this.getannonce(reservation.idAnnonce)?.idImmobilier,'batiment')
    this.venteService.addVente(newVente).subscribe(
      (response:Vente)=>{
        this.updateEtasReservation();
      alert("vente est bien effectuer");
          },(error:HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }
  getContratVente():ContratVente {
   
          this.contratVenteService.getContratVente(this.getannonce(this.currentReservation.idAnnonce).idContrat).subscribe(
            (response:ContratVente)=>{
              console.log(response);
              return response;
              
            }
          ),(error:HttpErrorResponse)=>{
            alert(error.message);
          }
      return this.currentContratVente;
  }
   gettypeAnnonce(id :number)
   {
     for(let annonce of this.annonceInternes){
       if(annonce.id==id){
           if(annonce.type=='Location'){
             return 'Location';
           }
           return 'Vente';
       }
       
     }
     return ' ';
   }

  public passerAuLocation(form :NgForm){
    document.getElementById('add-Location-form')?.click();
      this.getContratLocation()
      const FormValue=form.value;
      const newLocation= new Location(0,this.currentReservation?.idClient,FormValue['dateDebut'],FormValue['dateFin'],FormValue['montEncais'], this.getannonce(this.currentReservation.idAnnonce)?.idContrat,this.getannonce(this.currentReservation.idAnnonce)?.idImmobilier,'batiment')
      this.locationService.addLocation(newLocation).subscribe(
        (response:Location)=>{
           this.updateEtasReservation()
          alert("la location est bien ajouter")
        },(Error:HttpErrorResponse)=>{
          alert(Error.message);
        }
      )
    }
  
public updateEtasReservation(){
  this.currentReservation.etats='traite';
  this.reservationService.updateReservation(this.currentReservation).subscribe(
    (response)=>{

    },(error:HttpErrorResponse)=>{
      alert(error.message)
    }
  )
}

  public getContratLocation() :ContratLocation{
  
          this.contratLocationService.getContratLocation(this.getannonce(this.currentReservation.idAnnonce).idContrat).subscribe(
            (response:ContratLocation)=>{
              return response;
            }
          ),(error:HttpErrorResponse)=>{
            alert(error.message);
          }
     return  this.currentContratLocation
  }
  public onDeleteReservation(userId: number): void {
    this.reservationService.deleteReservation(userId).subscribe(
      (response: void) => {
        console.log(response);
        this.getReservation();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  getReservation(){
    this.reservationService.getReservationIntern().subscribe(
      (response :Reservation[])=>{
        this.reservationinternes=response;
      },
      (error :HttpErrorResponse)=>
      {
        alert(error.message)
      }
    );
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
   public onAccepte(resevation :Reservation){
        resevation.etats="Accepte";
        this.reservationService.updateReservation(resevation).subscribe(
          (response :Reservation )=>{
            this.annonceService.updateAnnonceInterneEtats(response.idAnnonce).subscribe(
              (response)=>{
   
              },(error:HttpErrorResponse)=>{
                alert(error.message);
              }
            )
          },(eror:HttpErrorResponse)=>{
            alert("La reservation n'est pas accepter")
          }
          );
  
          this.deleteReservations(resevation?.idAnnonce,resevation?.id);
      
   }

   public onOpenModal(reservatio: Reservation ): void {
    this.currentReservation=reservatio;
    const container = document.getElementById('main-container');
     
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    
      button.setAttribute('data-target', '#addLocationModal');
     
     
    container?.appendChild(button)
    button.click();
 }
 public searchDemande(key: string): void {
  console.log(key);
  const results: Reservation[] = [];
  for (const reservation of this.reservationinternes) {
    if (('' +reservation?.idClient+'').toLowerCase().indexOf(key.toLowerCase()) !== -1
    ||('' +reservation?.idAnnonce+'').toLowerCase().indexOf(key.toLowerCase()) !== -1
    || reservation?.etats.toLowerCase().indexOf(key.toLowerCase()) !== -1
    
    ) {
      results.push(reservation);
    }
  }
  this.reservationinternes = results;
  if (!key) {
    this.getReservation();
      }
  }


}
