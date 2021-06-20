 
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
  img: Image | undefined;
  constructor(private etageService :EtageService, private route : ActivatedRoute ,private immobilierBatiService : ImmobilierBatiService ,private imageService :ImageService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.getImmoBilierBati(+id);
    this.getEtages(+id);
      this.getImages(+id);
    //  console.log(this.images);
    console.log(this.img);
  }

  public onFileChanged(event:any) {
    this.selectedFile = event.target.files[0];
  }
  public getImage(image:any){

    const base64Data = image;
    const retrievedImage = 'data:image/jpeg;base64,' + base64Data;
    return retrievedImage;

  }

  public getImage2(){
    
    const base64Data = this.img?.image;
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
        for(let img of response){
          if(img.corespondance == "immobilierBati")
            this.img = img;
         
        }
       
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


  onAddImageBati(addImageBatiForm :NgForm){
    document.getElementById('add-IB-form')?.click();
    const formvalue = addImageBatiForm.value ;
  
    const newImage = new Image(0,formvalue['idCorespondance'],formvalue['corespondance'],[0]);
 
    
     const uploadImage = new FormData();
    uploadImage.append('imageFile', this.selectedFile ,this.selectedFile.name);
    uploadImage.append('image', JSON.stringify(newImage));
    
  
     this.imageService.addImage(uploadImage).subscribe(
      (response) => {
        console.log(response);
        this.getImmoBilierBati(+this.route.snapshot.params['id']);
        this.getImages(+this.route.snapshot.params['id']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
       
      }
    );

  }

  getNombreImage(id :number){
  var n :number = 0;
    for(let img of this.images){
        if(img.corespondance === id.toString())
        n = n + 1;
    }
    return n;
  }

  getBatiImageEx(){
    var Ex :boolean = false ;
      for(let img of this.images){
          if(img.corespondance === 'immobilierBati')
          Ex = true;
      }
      return Ex;
    }
  

  onAddImageEtage(addForm :NgForm){
    document.getElementById('add-ImageEtage-form')?.click();
    const formvalue =addForm.value ;
   const idToString = this.addImageEtage.id.toString();
    const newImage = new Image(0,this.immobilierBati?.id,idToString,[0]);
 
     const uploadImage = new FormData()
    uploadImage.append('imageFile', this.selectedFile ,this.selectedFile.name);
    uploadImage.append('image', JSON.stringify(newImage));
    
  
     this.imageService.addImage(uploadImage).subscribe(
      (response) => {
       
        this.getImmoBilierBati(+this.route.snapshot.params['id']);
        this.getImages(+this.route.snapshot.params['id']);
      
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
       
      }
    );

  }

  onDeleteImage(id : number): void {
    console.log(id)
;    this.imageService.deleteImage(id).subscribe(
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

    const newEtage = new Etage(0,formvalue['numEtage'], this.immobilierBati?.id, formvalue['description']);
     this.etageService.addEtage(newEtage).subscribe(
      (response) => {
     
        const id = this.route.snapshot.params['id'];
        this.getEtages(+id);
        this.getImmoBilierBati(+id);
    
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      
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
    if (mode === 'addImageBati') {
      button.setAttribute('data-target', '#addImageBatiModal');
    }
    if (mode === 'addEtage') {
      button.setAttribute('data-target', '#addEtageModal');
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
    }if (mode === 'addImageEtage') {
      this.addImageEtage= new Etage(id," ",0," ") 
      button.setAttribute('data-target', '#addImageEtageModal');
   }
    container?.appendChild(button)
    button.click();
  }




}


