import { Component, OnInit } from '@angular/core';
import { ImmobilierBatiService } from 'src/app/services/immobilierBati.service';
import { ImmobilierBati } from 'src/app/models/ImmobilierBati';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Point } from 'src/app/models/Point';
import { ProC1 } from 'src/app/models/proc1';
import { ProrietaireService } from 'src/app/services/proprietaire.service';
import { ProprietairesComponent } from '../proprietaires/proprietaires.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-immobilier',
  templateUrl: './immobilierBati.component.html',
  styleUrls: ['./immobilierBati.component.css']
})
export class ImmobilierBatiComponent implements OnInit {


  public immobilierBatis!: ImmobilierBati[];
  public Proprietaires!: ProC1[];
  public editImmobilierBati!: ImmobilierBati;
  public deleteImmobilierBati!: ImmobilierBati;
  public nProprietaire :  ProC1 | undefined ;
  selectedFile!: File;

  retrievedImage: any;
   base64Data: any;
    retrieveResonse: any;
    message!: string;
    imageName: any; 

  constructor(private immobilierBatiService: ImmobilierBatiService
    ,private proprietaireService: ProrietaireService,private router :Router) { }

  ngOnInit(): void {
    this.getImmobilierBatis();
    this.getProC1s();
  }
  
  public getNomProprietaire(id :number): void{
    this.proprietaireService.getNomProprietaire(id).subscribe(
      (response :ProC1) => {
        this.nProprietaire = response;
        console.log(this.nProprietaire);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
   
      }


      onViewImmobilierBati(id: number) {
        this.router.navigate(['/menu','detail',id]);
      }

  public getProC1s(): void {
    this.proprietaireService.getProC1s().subscribe(
      (response: ProC1[]) => {
        this.Proprietaires = response;
      
      },
      (error: HttpErrorResponse) => {
    //  alert(error.message);
      }
    );
  }
  

  public getImmobilierBatis(): void {
    this.immobilierBatiService.getImmobilierBatis().subscribe(
      (response: ImmobilierBati[]) => {
        this.immobilierBatis = response;
        console.log(this.immobilierBatis);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
 

  public onFileChanged(event:any) {
  
     //   this.selectedFile = event.target.files[0];
      }
      public getImage(image:any){
    
       // const base64Data = image
        //const retrievedImage = 'data:image/jpeg;base64,' + base64Data;
        //console.log(retrievedImage);
        //return retrievedImage;
    
      }
      

  public onAddImmobilierBati(addForm: NgForm): void {
    document.getElementById('add-immobilierBati-form')?.click();
    
    console.log(addForm);
    const formvalue =addForm.value ;
    const p = new Point(formvalue['x'],formvalue['y']);
    const newimmobilierBati = new ImmobilierBati(0,
      formvalue['adresse'],
      p,
      formvalue['numeroPermie'],
      formvalue['longueur'],
      formvalue['largeur'],
      formvalue['idProprietaire'],
      formvalue['nom'],
      formvalue['longueurBati'],
      formvalue['largeurBati']);
    
      
    this.immobilierBatiService.addImmobilierBati(newimmobilierBati).subscribe(
      (response) => {
        
        console.log(response);
        this.getImmobilierBatis();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateImmobilierBati(editForm: NgForm): void {

    document.getElementById('update-immobilierBati-form')?.click();
   
    console.log(editForm);
    const formvalue =editForm.value ;
    const p = new Point(formvalue['localisationx'],formvalue['localisationy']);
    const updatimmobilierBati = new ImmobilierBati(formvalue['id'],
      formvalue['adresse'],
      p,
      formvalue['numeroPermie'],
      formvalue['longueur'],
      formvalue['largeur'],
      formvalue['idProprietaire'],
      formvalue['nom'],
      formvalue['longueurBati'],
      formvalue['largeurBati']);

    

  this.immobilierBatiService.updateImmobilierBati(updatimmobilierBati).subscribe(
    (response: ImmobilierBati) => {
      console.log(response);
      this.getImmobilierBatis();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  )
}
  
  public onDeleteImmobilierBati(ImmobilierBatiId: number): void {
    this.immobilierBatiService.deleteImmobilierBati(ImmobilierBatiId).subscribe(
      (response: void) => {
        console.log(response);
        this.getImmobilierBatis();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  
  public searchImmobilierBatis(key: string): void {
  /*  console.log(key);
    const results: ImmobilierBati[] = [];
    for (const user of this.immobilierBatis) {
      if (user.username.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||user.phone !== -1
      || user.role.toLowerCase().indexOf(key.toLowerCase()) !== -1
       ) {
        results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !key) {
      this.getUsers();
    */    }
  


  public onOpenModal(immobilierBati: ImmobilierBati, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addImmobilierBatiModal');
    }
    if (mode === 'edit') {
      this.editImmobilierBati = immobilierBati;
      button.setAttribute('data-target', '#updateImmobilierBatiModal');
    }
    if (mode === 'delete') {
      this.deleteImmobilierBati = immobilierBati;
      button.setAttribute('data-target', '#deleteImmobilierBatiModal');
    }
    container?.appendChild(button)
    button.click();
  }

}
