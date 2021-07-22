import { ImmobilierBatiService } from './../../services/immobilierBati.service';
import { ClientService } from './../../services/client.service';
import { ContratVenteService } from './../../services/contratVente.service';
import { Vente } from './../../models/vente';
import { VenteService } from './../../services/vente.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ContratVente } from 'src/app/models/contratVente';
import { NgForm } from '@angular/forms';
import { Terrian } from 'src/app/models/terrein';
import { ImmobilierBati } from 'src/app/models/ImmobilierBati';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.css']
})
export class VenteComponent implements OnInit {
  public ventes!: Vente[]; 
  public editeVente!: Vente;
  public deleteVente!: Vente;
  public type! :string
  public contratVentes!: ContratVente[];
  public terrains!:Terrian[];
  public batiments !: ImmobilierBati[]
  public clients !: Client[]
   constructor(private clientService: ClientService,private immobilierBatiService :ImmobilierBatiService, private venteService :VenteService ,private contratVenteService :ContratVenteService) { }
 
   ngOnInit(): void {
     this.getVente();
     this.getcontrat();
     this.getClient();
     this.getBatiment();
   }
  getBatiment() {
    this.immobilierBatiService.getImmobilierBatispc1().subscribe(
      (response:ImmobilierBati[])=>{
        this.batiments=response;
      },(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }
  public getClient() {
    this.clientService.getClients().subscribe(
      (response:Client[])=>{
        this.clients=response;
      },(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }
  public getcontrat() {
   this.contratVenteService.getContratVentes().subscribe(
     (response:ContratVente[])=>{
       this.contratVentes=response;
     },(error:HttpErrorResponse)=>{
       alert(error.message);
     }
   )
  }
   getVente() {
   this.venteService.getVenteAll().subscribe(
     (response :Vente[])=>{
       this.ventes=response;
     },(error:HttpErrorResponse)=>{
       alert(error.message);
     }

   )   
  
   }
   public onAddVente(form :NgForm){
     document.getElementById('add-Vente-form')?.click();
     const formValue=form.value;

     const vente =new Vente(0,formValue['date_vente'], formValue['idcontrat_vente'],0,formValue['id_Client'],formValue['id_immobilier'],formValue['type'])
     this.venteService.addVente(vente).subscribe(
       (response)=>{
         this.getVente()
       },(error:HttpErrorResponse)=>{
         alert(error.message);
       }
     )
   }
   public onUpdateVente(vente : Vente){
     this.venteService.updateVente(vente).subscribe(
      (response)=>{
         console.log(response);
         this.getVente()
      },(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )
   }
   onDeleteVente(idVente :number){
    this.venteService.deleteVente(idVente).subscribe(
      (response)=>{
        this.getVente()
      },(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )
   }
  onOpenModal(vente : Vente , mode : string):void{
 
   
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addVenteModal');
    }
    if (mode === 'edit') {
      this.editeVente = vente;
      button.setAttribute('data-target', '#updateVenteModal');
    }
    if (mode === 'delete') {
      this.deleteVente = vente;
      button.setAttribute('data-target', '#deleteVenteModal');
    }
    container?.appendChild(button)
    button.click();
  }

}
