 
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ImmobilierBatiService } from './../../services/immobilierBati.service';
import { Component, OnInit } from '@angular/core';
import { ImmobilierBati } from 'src/app/models/ImmobilierBati';
import { ImageService } from 'src/app/services/image.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Etage } from 'src/app/models/etage';
import { EtageService } from 'src/app/services/etage.service';
import { ImmobilierBatiComponent } from '../immobilierBati/immobilierBati.component';
import { Image } from 'src/app/models/image';

@Component({
  selector: 'app-single-immoblier-bati',
  templateUrl: './single-immoblier-bati.component.html',
  styleUrls: ['./single-immoblier-bati.component.css']
})
export class SingleImmoblierBatiComponent implements OnInit {

  immobilierBati!: ImmobilierBati ;
  images!: Image[];
  etages!: Etage[];
  addImageEtage: Etage | undefined;
  selectedFile! :File;
  deleteEtage: Etage | undefined;
  deleteImageId: number | undefined;
  imagesEtage!: Image[]  ;
  editEtage: Etage | undefined;
  constructor(private etageService :EtageService, private route : ActivatedRoute ,private immobilierBatiService : ImmobilierBatiService ,private imageService :ImageService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.getImmoBilierBati(+id);
    this.getEtages(+id);
      this.getImages(+id);
    //  console.log(this.images);
  }

  public onFileChanged(event:any) {
    this.selectedFile = event.target.files[0];
  }
  public getImage(image:any){

    const base64Data = image
    const retrievedImage = 'data:image/jpeg;base64,' + base64Data;

    return retrievedImage;

  }
   
  getImmoBilierBati(id :number){
    this.immobilierBatiService.getImmobilierBati(id).subscribe(
      (response: ImmobilierBati) => {
        this.immobilierBati = response;
      
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  getImages(id : number) : void{
    this.imageService.getImages(id).subscribe(
      (response: Image[]) => {
        this.images = response;
       
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
   
  getImagesEtage(id : number) : void{
    this.imageService.getImages(id).subscribe(
      (response: Image[]) => {
     this.imagesEtage =response;
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  onAddImage(addForm :NgForm){
  
    const formvalue =addForm.value ;
    const newImage = new Image(0,formvalue['idCorespondance'],formvalue['corespondance'],[0]);
 
  if(newImage.corespondance == "immobilierBati")
    document.getElementById('add-IB-form')?.click();
  else
  document.getElementById('add-ImageEtage-form')?.click();

     const uploadImage = new FormData()
    uploadImage.append('imageFile', this.selectedFile ,this.selectedFile.name);
    uploadImage.append('image', JSON.stringify(newImage));
    
  
     this.imageService.addImage(uploadImage).subscribe(
      (response) => {
       
        const id = this.route.snapshot.params['id'];
        this.getImmoBilierBati(+id);
        if(newImage.corespondance == "immobilierBati")
        this.getImages(+id);
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );

  }

  onDeleteImage(id : number): void {
    
    this.imageService.deleteImage(id).subscribe(
      (response: void) => {
       
        const id = this.route.snapshot.params['id'];
        
        this.getImages(+id);
        this.getImmoBilierBati(+id);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
 }

 public onUpdateImage(image: Image): void {
  document.getElementById('update-image-form')?.click();
  const uploadImage = new FormData()
  
  uploadImage.append('imageFile', this.selectedFile ,this.selectedFile.name);
    image.image= [0];
  uploadImage.append('image', JSON.stringify(image));
  this.imageService.updateImage(uploadImage).subscribe(
    (response: Image) => {
   
      this.getImmoBilierBati(+this.route.snapshot.params['id']);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
  }




  //////


  onAddEtage(addFormEt :NgForm){
    document.getElementById('add-Etage-form')?.click();
    const formvalue =addFormEt.value ;

    const newEtage = new Etage(0,formvalue['numEtage'], formvalue['idImmobilierBati'], formvalue['description']);
     this.etageService.addEtage(newEtage).subscribe(
      (response) => {
     
        const id = this.route.snapshot.params['id'];
        this.getEtages(+id);
        addFormEt.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addFormEt.reset();
      }
    );

  }

  public onUpdateEtage(etage: Etage): void {
    document.getElementById('update-Etage-form')?.click();
    this.etageService.updateEtage(etage).subscribe(
      (response: Etage) => {
      // console.log(response);
        const id = this.route.snapshot.params['id'];
        this.getEtages(+id);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    }
   
    onDeleteEtage(id : number): void {
      this.etageService.deleteEtage(id).subscribe(
        (response: void) => {
        //  console.log(response);
          const id = this.route.snapshot.params['id'];
          this.getEtages(+id);
  
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
   }

   getEtages(id : number) : void{
    this.etageService.getEtages(id).subscribe(
      (response: Etage[]) => {
        this.etages = response;
     //   console.log(this.etages);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  
  public onOpenModal(etage: Etage, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addImageModal');
    }
    if (mode === 'addEtage') {
      button.setAttribute('data-target', '#addEtageModal');
   }
   if (mode === 'addImageEtage') {
    this.addImageEtage = etage;
    button.setAttribute('data-target', '#addImageEtageModal');
 }
    if (mode === 'editEtage') {
      this.editEtage = etage;
      button.setAttribute('data-target', '#updateEtageModal');}
    if (mode === 'deleteEtage') {
        this.deleteEtage = etage;
        button.setAttribute('data-target', '#deleteEtageModal');}
    container?.appendChild(button)
    button.click();
  }

  public onOpenModal2(id: number, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'delete') {
      this.deleteImageId = id;
      button.setAttribute('data-target', '#deleteImageModal');
    }
    container?.appendChild(button)
    button.click();
  }




}


