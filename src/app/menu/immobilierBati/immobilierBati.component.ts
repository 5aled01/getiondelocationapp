 

 
import { ContratLocationService } from './../../services/contrat-location.service';
import { AnnonceExterne } from 'src/app/models/annonceExterne';
import { AnnonceInetrne } from 'src/app/models/annonceInterne';
 
import { EtageService } from './../../services/etage.service';
import { Component, OnInit } from '@angular/core';
import { ImmobilierBatiService } from 'src/app/services/immobilierBati.service';
import { ImmobilierBati } from 'src/app/models/ImmobilierBati';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Point } from 'src/app/models/Point';
import { ProC1 } from 'src/app/models/proc1';
import { ProrietaireService } from 'src/app/services/proprietaire.service';
 
import { Router } from '@angular/router';
import { ProC2 } from 'src/app/models/proc2';
import { Etage } from 'src/app/models/etage';
import { ContratVenteService } from 'src/app/services/contratVente.service';
import { ContratLocation } from 'src/app/models/contratLocation';
import { ContratVente } from 'src/app/models/contratVente';
import { AnnonceService } from 'src/app/services/annonce.service';
import { ThrowStmt } from '@angular/compiler';
import { Image } from 'src/app/models/image';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-immobilier',
  templateUrl: './immobilierBati.component.html',
  styleUrls: ['./immobilierBati.component.css']
})
export class ImmobilierBatiComponent implements OnInit {

 
public immobilierBatisAnnoced: ImmobilierBati[] = [];
  
public immobilierBatis!: ImmobilierBati[] ;
  public proC1s! : ProC1[]  ;
 
  public proC2s! : ProC2[]  ;
  images!: Image[];
  img!: any;
  public editImmobilierBati: ImmobilierBati | undefined ;
  public deleteImmobilierBati: ImmobilierBati | undefined ;
  public typep :string  ="proc1";
  public type :string  ="Vente";
  public currentImmob! :ImmobilierBati;  
   public  nomproprietaire:string='undefined';
  public annonced: boolean = false ;
  public contratLocations!: ContratLocation[];
  public contratVentes!: ContratVente[];
   

  constructor(private imageService :ImageService, private immobilierBatiService: ImmobilierBatiService,private etageService:EtageService ,
    private proprietaireService: ProrietaireService,private serviceAnnonce:  AnnonceService,
    private contratLocationService:ContratLocationService,private contratVenteService :ContratVenteService,private router :Router) { }

  ngOnInit(): void { 
    
    this.getImmobilierBatis();
    this.getProC1s();
    this.getProC2s();
    this.getImmobilierBatisAnnoced();
    this.getImages();
   
  }
  public getImage(id :number){
    for(let image of this.images){
    if(image.idCorespondance === id){
        const retrievedImage = 'data:image/jpeg;base64,' +  image.image;
        return retrievedImage;
    }
        }
        return '../assets/img/livingroom.png';
        
      }
  getImages() : void{
    this.imageService.getImmagesBatiment().subscribe(
      (response: Image[]) => {
        this.images = response;
        console.log(response)
       
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
 getContratVentes() {
   this.contratVenteService.getContratVentes().subscribe(

    (response : ContratVente[])=>{
      this.contratVentes =response ;
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
    formvalue['type'],"Disponible",formvalue['description'],formvalue['fraisAnnonce'],formvalue['dateFinAnnonce'],formvalue['prxiImmobilier']);

    this.serviceAnnonce.addAnnoncExterne(newAE).subscribe(
      (response) => {
        
        console.log(response);
       
        addForm.reset();
        this.getImmobilierBatis();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  public onAddAI(addForm: NgForm): void {
    document.getElementById('add-AI-form')?.click();
    const formvalue =addForm.value ;
    const newAI = new AnnonceInetrne(0,this.currentImmob?.id,formvalue['dateDebut'],
    formvalue['type'],"Disponible",formvalue['description'],formvalue['idContrat']);
 
 
    this.serviceAnnonce.addAnnoncInterne(newAI).subscribe(
      (response) => {
        console.log(response);
        addForm.reset();
        this.getImmobilierBatis()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
 

  public annoced(id :number ):Boolean{
    let p :Boolean = false;
     for(let immob of this.immobilierBatisAnnoced){
       if(immob?.id===id)
        {
          p=true;
          break;
        }
     }
     return p;
  }

  

 public getImmobilierBatisAnnoced(){
   this.immobilierBatiService.getImmobilierBatisAnnonce().subscribe(
     (response:ImmobilierBati[])=>{
       this.immobilierBatisAnnoced=response;
     },(error:HttpErrorResponse)=>{
       alert(error.message)
     }
   )
  }




 
 
 /* public getproprietaire(immob :ImmobilierBati)  {
     
 if(immob.typeProprietaire=='proc1'){
    for(let pro of this.proC1s){
       if(pro.id==immob?.id){
          this.nomproprietaire=pro.nom+' '+ pro.prenom;
          break;
       }  }
        
    }
    else{
      for(let pro of this.proC2s){
         if(pro.id==immob?.id){
           this.nomproprietaire=pro.nom +' '+pro.prenom;
           break;
         }  }
          
      }
    
  } 

*/
      onViewImmobilierBati(id: number) {
        this.router.navigate(['/menu','detail',id]);
      }

  public getProC1s(): void {
    this.proprietaireService.getProC1s().subscribe(
      (response: ProC1[]) => {
        this.proC1s = response;
      
      },
      (error: HttpErrorResponse) => {
    //  alert(error.message);
      }
    );
  }
  public getProC2s(): void {
    this.proprietaireService.getProC2s().subscribe(
      (response: ProC2[]) => {
        this.proC2s = response;
      
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
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
 

  public onFileChanged(event:any) {
  
     //   this.selectedFile = event.target.files[0];
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
      formvalue['typeProprietaire'],
      formvalue['nom'],
      formvalue['longueurBati'],
      formvalue['largeurBati']);
    
      
    this.immobilierBatiService.addImmobilierBati(newimmobilierBati).subscribe(
      (response) => {
        const etage=new Etage(0,1,response?.id,"*****",1,1,1,1,0);
        this.etageService.addEtage(etage).subscribe(
          (response)=>{

          },
          (error: HttpErrorResponse) => {
            alert(error.message);
            addForm.reset();
          }
        );
        console.log(response);
        this.getImmobilierBatisAnnoced()
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
      formvalue['typeProprietaire'],
      formvalue['nom'],
      formvalue['longueurBati'],
      formvalue['largeurBati']);

    

  this.immobilierBatiService.updateImmobilierBati(updatimmobilierBati).subscribe(
    (response: ImmobilierBati) => {
      console.log(response);
      this.getImmobilierBatisAnnoced()
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
        this.getImmobilierBatisAnnoced();
        this.getImmobilierBatis();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  
  public searchImmobilierBatis(key: string): void {
    console.log(key);
    const results: ImmobilierBati[] = [];
    for (const immobilierBati of this.immobilierBatis) {
      if (immobilierBati?.adresse.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||immobilierBati?.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || immobilierBati?.numeroPermie.toLowerCase().indexOf(key.toLowerCase()) !== -1
     
      
      ) {
        results.push(immobilierBati);
      }
    }
    this.immobilierBatis = results;
    if (!key) {
      this.getImmobilierBatis();
        }
    }


    

  public onOpenModal(immobilierBati: ImmobilierBati, mode: string): void {
    const container = document.getElementById('main-container');
    this.getContratLocations();
    this.getContratVentes();
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addImmobilierBatiModal');
    }
    if(mode==='addAnnonce'){
         if(immobilierBati.typeProprietaire=='proc1'){
          button.setAttribute('data-target', '#addAIModal');
         }
         if(immobilierBati.typeProprietaire=='proc2'){
          button.setAttribute('data-target', '#addAEModal');
         }
         this.currentImmob=immobilierBati;
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


  public onOpenModal1(immobilierBati: ImmobilierBati, mode: string): void {
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
