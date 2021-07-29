import { ClientService } from 'src/app/services/client.service';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

 
  public clients!: Client[];
  public editeClient: Client | undefined;
  public deleteClient: Client | undefined;
  
  selectedFile!: File  ;
  retrievedImage!: any;
   base64Data!: any;
    retrieveResonse!: any;
    message!: string | undefined;
    imageName!: any;
  

  constructor(private clientService: ClientService) {
   }

  ngOnInit(){
    this.getClients();
  }

  public getClients(): void {
    this.clientService.getClients().subscribe(
      (response: Client[]) => {
        this.clients = response;
      
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
      

  public onAddClient(addForm: NgForm): void {
    document.getElementById('add-Client-form')?.click();
    const formvalue =addForm.value ;
    const newuser = new  Client(0,formvalue['nom'],formvalue['prenom'],formvalue['authnom'],formvalue['nni'],
    formvalue['telephone'],formvalue['password'], [0]);


     newuser.image= null;

     const uploadImage = new FormData()
    uploadImage.append('imageFile', this.selectedFile ,this.selectedFile.name);
    uploadImage.append('client', JSON.stringify(newuser));
     console.log(uploadImage);
 
  /* this.selectedFile = null; */
    
        
    this.clientService.addClient(uploadImage).subscribe(
      (response) => {
        
        console.log(response);
        this.getClients();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateClient(client: Client): void {
    document.getElementById('update-Client-form')
    ?.click();
    const uploadImage = new FormData()
    if(this.selectedFile){
    uploadImage.append('imageFile', this.selectedFile ,this.selectedFile.name);
     
    uploadImage.append('client', JSON.stringify(client));
    this.selectedFile=null; 
    this.clientService.updateClientwithimg(uploadImage).subscribe(
      (response: Client) => {
        console.log(response);
        this.getClients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  else{
    
    client.image=null;
  uploadImage.append('client', JSON.stringify(client));
  this.clientService.updateClient(uploadImage).subscribe(
    (response: Client) => {
      console.log(response);
      this.getClients();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  )
  }
  }
  public onDeleteClient(userId: number): void {
    this.clientService.deleteClient(userId).subscribe(
      (response: void) => {
        console.log(response);
        this.getClients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchUsers(key: string): void {
    console.log(key);
    const results: Client[] = [];
    for (const client of this.clients) {
      if (client.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
     
      || client.prenom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || client.id.toString().indexOf(key.toLowerCase()) !== -1
       ) {
        results.push(client);
      }
    }
    this.clients = results;
    if (!key) {
      this.getClients();
    }
  }

  public onOpenModal(client: Client, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addClientModal');
    }
    if (mode === 'edit') {
      this.editeClient = client;
      button.setAttribute('data-target', '#updateClientModal');
    }
    if (mode === 'delete') {
      this.deleteClient = client;
      button.setAttribute('data-target', '#deleteClientModal');
    }
    container?.appendChild(button)
    button.click();
  }
}
