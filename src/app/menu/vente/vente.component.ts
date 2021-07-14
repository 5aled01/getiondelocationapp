import { Vente } from './../../models/vente';
import { VenteService } from './../../services/vente.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.css']
})
export class VenteComponent implements OnInit {
  public ventes!: Vente[]; 
  public editeVente!: Vente;
  public deleteVente!: Vente
   constructor(private venteService :VenteService) { }
 
   ngOnInit(): void {
     this.getLocation();
     
     
   }
   getLocation() {
   this.venteService.getVenteAll().subscribe(
     (response :Vente[])=>{
       this.ventes=response;
     },(error:HttpErrorResponse)=>{
       alert(error.message);
     }
   )   
  
   }
  onOpenModal(location : Vente , modal : string):void{
 
   }

}
