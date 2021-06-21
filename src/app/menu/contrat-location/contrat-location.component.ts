import { Observable } from 'rxjs';
 
import { ContratLocationService } from './../../services/contrat-location.service';
import { Component, OnInit } from '@angular/core';
import { ContratLocation } from 'src/app/models/contratLocation';
import { HttpErrorResponse } from '@angular/common/http';
import { ProC1 } from 'src/app/models/proc1';
import { NgForm } from '@angular/forms';
import { ProrietaireService } from 'src/app/services/proprietaire.service';

@Component({
  selector: 'app-contrat-location',
  templateUrl: './contrat-location.component.html',
  styleUrls: ['./contrat-location.component.css']
})
export class ContratLocationComponent implements OnInit {

   
    public contratLocations!: ContratLocation[] ;
    public editeContratLocation: ContratLocation | undefined;
    public deleteContratLocation: ContratLocation | undefined;
     public proprietaires! :ProC1[]  ;
     public proprietaire! :ProC1  ;
  
    constructor(private prorietaireService:ProrietaireService,private contratLocationService: ContratLocationService) {
     }
  
    ngOnInit(){
      this.getContratLocations();
      this.getProprietaires();
    }
       
    public getContratLocations(): void {
      this.contratLocationService.getContratLocations().subscribe(
        (response: ContratLocation[]) => {
          this.contratLocations = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
 
   
    public onAddContratLocation(addForm: NgForm): void {
      document.getElementById('add-ContratLocation-form')?.click();
      const formvalue =addForm.value ;
      const newContrat = new ContratLocation(0,formvalue['dateDebut'],formvalue['dateFin'],formvalue['description'],
      formvalue['idProprietaire'],formvalue['prixProprietaire'],formvalue['prixLocation']);
    
          
      this.contratLocationService.addContratLocation(newContrat).subscribe(
        (response) => {
          console.log(response);
          this.getContratLocations();
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      );
    }
  
    public onUpdateContratLocation(contrat: ContratLocation): void {
      document.getElementById('update-ContratLocation-form')?.click();
     
      this.contratLocationService.updateContratLocation(contrat).subscribe(
        (response: ContratLocation) => {
          console.log(response);
          this.getContratLocations();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
        

    public onDeleteContratLocation( Id: number): void {
      this.contratLocationService.deleteContratLocation( Id).subscribe(
        (response: void) => {
          console.log(response);
          this.getContratLocations();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  
    public searchUsers(key: string): void {
      console.log(key);
      const results: ContratLocation[] = [];
      for (const user of this.contratLocations) {
       /* if (user.username.toLowerCase().indexOf(key.toLowerCase()) !== -1
        ||user.phone !== -1
        || user.role.toLowerCase().indexOf(key.toLowerCase()) !== -1
         ) {
          results.push(user);
        }*/
      }
      this.contratLocations = results;
      if (results.length === 0 || !key) {
        this.getContratLocations();
      }
    }
   
    public onOpenModal(contratLocation: ContratLocation, mode: string): void {
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if (mode === 'add') {
        button.setAttribute('data-target', '#addContratLocationModal');
      }
      if (mode === 'edit') {
        this.editeContratLocation = contratLocation;
        button.setAttribute('data-target', '#updateContratLocationModal');
      }
      if (mode === 'delete') {
        this.deleteContratLocation = contratLocation;
        button.setAttribute('data-target', '#deleteContratLocationModal');
      }
      container?.appendChild(button)
      button.click();
    }

   public getproprietaire(id :number)  {
    
      for(let pro of this.proprietaires){
         if(pro.id=id){
           this.proprietaire =pro ;
           break;
         }    
      }
      return this.proprietaire;
    } 


  public getProprietaires(): void {
    this.prorietaireService.getProC1s().subscribe(
      (response: ProC1[]) => {
          
        for(  let re of response){
          re.img=[0];
        }
         this.proprietaires=response
         console.log(this.proprietaires);
      },
      (error: HttpErrorResponse) => {
     //   alert(error.message);
      }
    );
      }
  }
  


