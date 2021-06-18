import { ImageService } from './../../services/image.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ImmobilierBatiService } from './../../services/immobilierBati.service';
import { Component, OnInit } from '@angular/core';
import { ImmobilierBati } from 'src/app/models/ImmobilierBati';
import { Image } from 'src/app/models/image';
import { ImageService } from 'src/app/services/image.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Etage } from 'src/app/models/etage';
import { EtageService } from 'src/app/services/etage.service';

@Component({
  selector: 'app-single-immoblier-bati',
  templateUrl: './single-immoblier-bati.component.html',
  styleUrls: ['./single-immoblier-bati.component.css']
})
export class SingleImmoblierBatiComponent implements OnInit {

  immobolierBati :Observable<ImmobilierBati>;
  images : Image[];
  etages: Etage[];
  selectedFile :File;
  constructor(private etageService :EtageService, private route : ActivatedRoute ,private immobilierBatiService : ImmobilierBatiService ,private imageService :ImageService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.getImmoBilierBati(+id);
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
   
  getImmoBilierBati(id :number){
    this.immobolierBati = this.immobilierBatiService.getImmobilierBati(id);
  }
  
  getImages(id : number) : void{
    this.imageService.getImages(id).subscribe(
      (response: Image[]) => {
        this.images = response;
        console.log(this.images);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  addImage(addForm :NgForm){
    const formvalue =addForm.value ;
    const newImage = new Image(0,formvalue['idcorespondance'],formvalue['corespondance'],[0]);
  

     const uploadImage = new FormData()
    uploadImage.append('imageFile', this.selectedFile ,this.selectedFile.name);
    uploadImage.append('image', JSON.stringify(newImage));
     console.log(uploadImage);
  
     this.imageService.addImage(uploadImage).subscribe(
      (response) => {
        console.log(response);
        this.getImmoBilierBati(+this.route.snapshot.params['id']);
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );

  }

  onDleteImage(id : number): void {
    this.imageService.deleteImage(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getImmoBilierBati(+this.route.snapshot.params['id']);

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
      console.log(response);
      this.getImmoBilierBati(+this.route.snapshot.params['id']);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
  }




  //////


  addEtage(addForm :NgForm){
    const formvalue =addForm.value ;
    const newEtage = new Etage(0,formvalue['numEtage'], formvalue['idImmobilierBati']);
  
 
     this.etageService.addEtage(newEtage).subscribe(
      (response) => {
        console.log(response);
        this.getImmoBilierBati(+this.route.snapshot.params['id']);
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );

  }

  public onUpdateEtage(etage: Etage): void {
    document.getElementById('update-Etage-form')?.click();
    
    this.etageService.updateEtage(etage).subscribe(
      (response: Etage) => {
        console.log(response);
        this.getImmoBilierBati(+this.route.snapshot.params['id']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    }
   
    onDleteEtage(id : number): void {
      this.etageService.deleteEtage(id).subscribe(
        (response: void) => {
          console.log(response);
          this.getImmoBilierBati(+this.route.snapshot.params['id']);
  
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
        console.log(this.etages);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
