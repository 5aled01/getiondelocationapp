import { ProrietaireService } from './../../services/proprietaire.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
 
import { ProC2 } from 'src/app/models/proc2';
import { NgForm } from '@angular/forms';
import { ProC1 } from 'src/app/models/proc1';

@Component({
  selector: 'app-proprietaires',
  templateUrl: './proprietaires.component.html',
  styleUrls: ['./proprietaires.component.css']
})
export class ProprietairesComponent implements OnInit {

  public proC1s: ProC1[];
  public editeProC1: ProC1;
  public deleteProC1: ProC1;

  
  public proC2s: ProC2[];
  public editeProC2: ProC2;
  public deleteProC2: ProC2;
    
  selectedFile: File;
  retrievedImage: any;
   base64Data: any;
    retrieveResonse: any;
    message: string;
    imageName: any;

  constructor(private prorietaireService :ProrietaireService) { }

  ngOnInit(): void {
    this.getProC1s();
    this.getProC2s();
  }
  public onFileChanged(event:any) {
  
    this.selectedFile = event.target.files[0];
  }
  public getImage(image:any){

    const base64Data = image
    const retrievedImage = 'data:image/jpeg;base64,' + base64Data;
    console.log(retrievedImage);
    return retrievedImage;

  }

  
  

  public getProC1s(): void {
    this.prorietaireService.getProC1s().subscribe(
      (response: ProC1[]) => {
        this.proC1s = response;
     
        console.log(this.proC1s);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
 


  public onAddProC1(addForm: NgForm): void {
    document.getElementById('add-ProC1-form').click();
    const formvalue =addForm.value ;
 
    const newProC1 = new ProC1(0,formvalue['nom'],formvalue['prenom'],
    formvalue['NNI'],formvalue['numcomp'],formvalue['pronom'],formvalue['password'],formvalue['phone'],[0]);

    newProC1.img= null;

     const uploadImage = new FormData()
    uploadImage.append('imageFile', this.selectedFile ,this.selectedFile.name);
    uploadImage.append('proC1', JSON.stringify(newProC1));
     console.log(uploadImage);
 

console.log(this.selectedFile);
    
        
    this.prorietaireService.addProC1(uploadImage).subscribe(
      (response) => {
        
        console.log(response);
        this.getProC1s();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateProC1(proC1: ProC1): void {
    document.getElementById('update-user-form').click();
    const uploadImage = new FormData()
    if(this.selectedFile){
    uploadImage.append('imageFile', this.selectedFile ,this.selectedFile.name);
      proC1.img=null;
    uploadImage.append('proc2', JSON.stringify(proC1));
    this.prorietaireService.updateProC1Withimg(uploadImage).subscribe(
      (response: ProC1) => {
        console.log(response);
        this.getProC1s();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  else{
    
    proC1.img=null;
  uploadImage.append('user', JSON.stringify(proC1));
  this.prorietaireService.updateProC1(uploadImage).subscribe(
    (response: ProC1) => {
      console.log(response);
      this.getProC1s();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  )
  }
  }
  public onDeleteProC1(userId: number): void {
    this.prorietaireService.deleteProC1(userId).subscribe(
      (response: void) => {
        console.log(response);
        this.getProC1s();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }




  
  public getProC2s(): void {
    this.prorietaireService.getProC2s().subscribe(
      (response: ProC2[]) => {
        this.proC2s = response;
     
        console.log(this.proC2s);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
 


  public onAddProC2(addForm: NgForm): void {
    document.getElementById('add-ProC2-form').click();
    const formvalue =addForm.value ;
 
    const newProC2 = new ProC1(0,formvalue['nom'],formvalue['prenom'],
    formvalue['NNI'],formvalue['numcomp'],formvalue['pronom'],formvalue['password'],formvalue['phone'],[0]);

    newProC2.img= null;

     const uploadImage = new FormData()
    uploadImage.append('imageFile', this.selectedFile ,this.selectedFile.name);
    uploadImage.append('proC2', JSON.stringify(newProC2));
     console.log(uploadImage);
 

console.log(this.selectedFile);
    
        
    this.prorietaireService.addProC2(uploadImage).subscribe(
      (response) => {
        
        console.log(response);
        this.getProC2s();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateProC2(proC2: ProC2): void {
    document.getElementById('update-user-form').click();
    const uploadImage = new FormData()
    if(this.selectedFile){
    uploadImage.append('imageFile', this.selectedFile ,this.selectedFile.name);
      proC2.img=null;
    uploadImage.append('proc2', JSON.stringify(proC2));
    this.prorietaireService.updateProC2Withimg(uploadImage).subscribe(
      (response: ProC2) => {
        console.log(response);
        this.getProC2s();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  else{
    
    proC2.img=null;
  uploadImage.append('proC2', JSON.stringify(proC2));
  this.prorietaireService.updateProC2(uploadImage).subscribe(
    (response: ProC2) => {
      console.log(response);
      this.getProC2s();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  )
  }
  }
  public onDeleteProC2(proC1Id: number): void {
    this.prorietaireService.deleteProC2(proC1Id).subscribe(
      (response: void) => {
        console.log(response);
        this.getProC2s();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public onOpenModal2(proC2: ProC2, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProC2Modal');
    }
    if (mode === 'edit') {
      this.editeProC2 = proC2;
      button.setAttribute('data-target', '#updateProC2Modal');
    }
    if (mode === 'delete') {
      this.deleteProC2 = proC2;
      button.setAttribute('data-target', '#deleteProC2Modal');
    }
    container?.appendChild(button)
    button.click();
  }

  public onOpenModal1(proC1: ProC1, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProC1Modal');
    }
    if (mode === 'edit') {
      this.editeProC1 = proC1;
      button.setAttribute('data-target', '#updateProC1Modal');
    }
    if (mode === 'delete') {
      this.deleteProC1 = proC1;
      button.setAttribute('data-target', '#deleteProC1Modal');
    }
    container?.appendChild(button)
    button.click();
  }
}
