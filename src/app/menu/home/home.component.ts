 
 
  
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
 
  public annonceInterne!:AnnonceInetrne;
  public currentContratLocation!: ContratLocation;
  public currentContratVente!: ContratVente;
  constructor(private venteService:VenteService, private reservationService :ReservationService ,private locationService:LocationService, private annonceService:AnnonceService ,private contratLocationService:ContratLocationService,private contratVenteService:ContratVenteService) { }

  ngOnInit(): void {
    this.getReservation();
    
  }
  PasserAuVente(reservation :Reservation){
    this.currentReservation=reservation
    this.getContratVente();
    const newVente= new Vente(0,new Date(),this.currentContratVente?.id ,0,this.currentReservation.idClient,this.annonceInterne.idImmobilier)
    this.venteService.addVente(newVente).subscribe(
      (response:Vente)=>{
      alert("vente est bien effectuer");
          },(error:HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }
  getContratVente() {
    this.annonceService.getAnnonceInterne(this.currentReservation.idAnnonce).subscribe(
      (response:AnnonceInetrne)=>{
        console.log(response)
        this.annonceInterne=response
          this.contratVenteService.getContratVente(response.idContrat).subscribe(
            (response:ContratVente)=>{
              console.log(response);
              this.currentContratVente=response;
            }
          ),(error:HttpErrorResponse)=>{
            alert(error.message);
          }
        },(error:HttpErrorResponse)=>{
          alert(error.message);
        }
      
    )
  }

  public passerAuLocation(form :NgForm){
    document.getElementById('add-Location-form')?.click();
      this.getContratLocation();
      const FormValue=form.value;
      console.log(FormValue['dateDebut'],this.currentReservation.idClient);
      const newLocation= new Location(0,this.currentReservation.idClient,FormValue['dateDebut'],FormValue['dateFin'],FormValue['montEncais'],this.currentContratLocation.id,this.annonceInterne.idImmobilier)
      this.locationService.addLocation(newLocation).subscribe(
        (response:Location)=>{
          alert("la location est bien ajouter")
        },(Error:HttpErrorResponse)=>{
          alert(Error.message);
        }
      )
    }

  public getContratLocation(){
    this.annonceService.getAnnonceInterne(this.currentReservation.idAnnonce).subscribe(
      (response:AnnonceInetrne)=>{
        this.annonceInterne=response;
          this.contratLocationService.getContratLocation(response.idContrat).subscribe(
            (response:ContratLocation)=>{
              this.currentContratLocation=response;
            }
          ),(error:HttpErrorResponse)=>{
            alert(error.message);
          }
        },(error:HttpErrorResponse)=>{
          alert(error.message);
        }
      
    )
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
}
