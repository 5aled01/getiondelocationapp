import { HttpErrorResponse } from '@angular/common/http';
import { ReservationService } from 'src/app/services/reservation.service';
import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public reservationinternes! :Reservation[];

  constructor(private reservationService :ReservationService) { }

  ngOnInit(): void {
    this.getReservation();
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

          },(eror:HttpErrorResponse)=>{
            alert("La reservation n'est pas accepter")
          }
          );
  
          this.deleteReservations(resevation?.idAnnonce,resevation?.id);
  
   }
}
