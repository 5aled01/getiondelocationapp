 

import { Component, OnInit } from '@angular/core';
import { AnnonceExterne } from 'src/app/models/annonceExterne';
import { AnnonceInetrne } from 'src/app/models/annonceInterne';
import { AnnonceService } from 'src/app/services/annonce.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ImmobilierBati } from 'src/app/models/ImmobilierBati';
import { ContratLocation } from 'src/app/models/contratLocation';
import { ImmobilierBatiService } from 'src/app/services/immobilierBati.service';
import { ContratLocationService } from 'src/app/services/contrat-location.service';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css']
})
export class AnnonceComponent implements OnInit {

  
  public annonceExternes!: AnnonceExterne[];
  public editeAnnonceExterne!: AnnonceExterne ;
  public deleteAnnonceExterne!: AnnonceExterne;

  
  public annonceInternes!: AnnonceInetrne[];
  public editeAnnonceInterne!: AnnonceInetrne;
  public deleteAnnonceInterne!: AnnonceInetrne;
    
 public immobilierBatis! :ImmobilierBati[] ;
 public contratLocations! :ContratLocation[] ;

  constructor(private annonceService :AnnonceService ,private immobilierBatiService:ImmobilierBatiService ,
              private contratLocationService :ContratLocationService) { }

  ngOnInit(): void {
    this.getAnnonceExternes();
    this.getAnnonceInternes();
    this.getContratLocations();
    this.getImmobilierBatis();
  }
  getContratLocations() {
     this.contratLocationService.getContratLocations().subscribe(

      (response : ContratLocation[])=>{
        this.contratLocations =response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
     );
  }
  getImmobilierBatis() {
    this.immobilierBatiService.getImmobilierBatis().subscribe(

      (response : ImmobilierBati[])=>{
        this.immobilierBatis =response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
     );
     
  }
  

  public getAnnonceExternes(): void {
    this.annonceService.getAllEx().subscribe(
      (response: AnnonceExterne[]) => {
        this.annonceExternes = response;
     
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
 


  public onAddAE(addForm: NgForm): void {
    document.getElementById('add-AE-form')?.click();
    const formvalue =addForm.value ;
 
    const newAE = new AnnonceExterne(0,formvalue['idImmobilier'],formvalue['dateDebut'],
    formvalue['type'],formvalue['description'],formvalue['fraisAnnonce'],formvalue['dateFinAnnonce'],formvalue['prxiImmobilier']);

    this.annonceService.addAnnoncExterne(newAE).subscribe(
      (response) => {
        
        console.log(response);
        this.getAnnonceExternes();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateAE(annonce: AnnonceExterne): void {
    document.getElementById('update-AE-form')?.click();
    
      this.annonceService.updateAnnonceExterne(annonce).subscribe(
      (response: AnnonceExterne) => {
        console.log(response);
        this.getAnnonceExternes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  public onDeleteAE(id: number): void {
   
    this.annonceService.deleteAnnonceExene(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getAnnonceExternes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }




  
  public getAnnonceInternes(): void {
    this.annonceService.getAllIn().subscribe(
      (response: AnnonceInetrne[]) => {
        this.annonceInternes = response;
     
        console.log(this.annonceInternes);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
 


  public onAddAI(addForm: NgForm): void {
    document.getElementById('add-AI-form')?.click();
    const formvalue =addForm.value ;
    const newAI = new AnnonceInetrne(0,formvalue['idImmobilier'],formvalue['dateDebut'],
    formvalue['type'],formvalue['description'],formvalue['idContrat']);
 
 
    this.annonceService.addAnnoncInterne(newAI).subscribe(
      (response) => {
        
        console.log(response);
        this.getAnnonceInternes();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateAI(annonce: AnnonceInetrne): void {
    document.getElementById('update-AI-form')?.click();
    const uploadImage = new FormData()
     
    this.annonceService.updateAnnonceInterne(annonce).subscribe(
      (response: AnnonceInetrne) => {
        console.log(response);
        this.getAnnonceInternes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteAI(id: number): void {
    this.annonceService.deleteAnnonceInterne(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getAnnonceInternes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
 

  public onOpenModal2(annoce: AnnonceInetrne, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addAIModal');
    }
    if (mode === 'edit') {
      this.editeAnnonceInterne = annoce;
      button.setAttribute('data-target', '#updateAIModal');
    }
    if (mode === 'delete') {
      this.deleteAnnonceInterne = annoce;
      button.setAttribute('data-target', '#deleteAIModal');
    }
    container?.appendChild(button)
    button.click();
  }

  public onOpenModal1(annoc: AnnonceExterne, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
        button.setAttribute('data-target', '#addAEModal');
    }
    if (mode === 'edit') {
     this.editeAnnonceExterne = annoc ;
      button.setAttribute('data-target', '#updateAEModal');
    }
    if (mode === 'delete') {
      this.deleteAnnonceExterne = annoc;
      button.setAttribute('data-target', '#deleteAEModal');
    }
    container?.appendChild(button)
    button.click();
 }


 public searchAnnonce(key: string): void {
  console.log(key);
  const results1: AnnonceExterne[] = [];
  const results2: AnnonceInetrne[] = [];
  for (const annonceExterne of this.annonceExternes) {
    if (annonceExterne.prxiImmobilier.toString().indexOf(key.toString()
      ) !== -1
    ||annonceExterne.fraisAnnonce.toString().indexOf(key.toString()) !== -1
    || annonceExterne.dateFinAnnonce.toString().indexOf(key.toString()) !== -1
    || annonceExterne.dateDebut.toString().indexOf(key.toString()) !== -1
    || annonceExterne.id.toString().indexOf(key.toString()) !== -1
    
    ) {
      results1.push(annonceExterne);
    }
  }


  for (const annonceInterne of this.annonceInternes) {
    if (annonceInterne.dateDebut.toString().indexOf(key.toString()) !== -1
    ||annonceInterne.idContrat.toString().indexOf(key.toString()) !== -1
    ||annonceInterne.id.toString().indexOf(key.toString()) !== -1
    
    ) {
      results2.push(annonceInterne);
    }

  this.annonceExternes = results1;
  this.annonceInternes = results2;

  if (!key) {
    this.getAnnonceExternes();
    this.getAnnonceInternes();
      }

  }

 }
}
