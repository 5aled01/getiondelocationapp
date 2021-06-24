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
  

}
