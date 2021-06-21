import { HttpErrorResponse } from '@angular/common/http';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: User[];
  public editUser: User;
  public deleteUser: User;
  
  selectedFile: File;
  retrievedImage: any;
   base64Data: any;
    retrieveResonse: any;
    message: string;
    imageName: any;
  

  constructor(private userService: UserService) {
   }

  ngOnInit(){
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
     
        console.log(this.users);
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
      

  public onAddUser(addForm: NgForm): void {
    document.getElementById('add-user-form')?.click();
    const formvalue =addForm.value ;
    const newuser = new User(0,formvalue['username'],formvalue['password'],
    formvalue['role'],[0],formvalue['phone']);

     newuser.image= null;

     const uploadImage = new FormData()
    uploadImage.append('imageFile', this.selectedFile ,this.selectedFile.name);
    uploadImage.append('user', JSON.stringify(newuser));
     console.log(uploadImage);
 

console.log(this.selectedFile);
    
        
    this.userService.addUser(uploadImage).subscribe(
      (response) => {
        
        console.log(response);
        this.getUsers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateUser(user: User): void {
    document.getElementById('update-user-form')
    ?.click();
    const uploadImage = new FormData()
    if(this.selectedFile){
    uploadImage.append('imageFile', this.selectedFile ,this.selectedFile.name);
      user.image=null;
    uploadImage.append('user', JSON.stringify(user));
    this.userService.updateUserWithimg(uploadImage).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  else{
    
    user.image=null;
  uploadImage.append('user', JSON.stringify(user));
  this.userService.updateUser(uploadImage).subscribe(
    (response: User) => {
      console.log(response);
      this.getUsers();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  )
  }
  }
  public onDeleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      (response: void) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchUsers(key: string): void {
    console.log(key);
    const results: User[] = [];
    for (const user of this.users) {
      if (user.username.toLowerCase().indexOf(key.toLowerCase()) !== -1
     
      || user.role.toLowerCase().indexOf(key.toLowerCase()) !== -1
       ) {
        results.push(user);
      }
    }
    this.users = results;
    if (!key) {
      this.getUsers();
    }
  }

  public onOpenModal(user: User, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addUserModal');
    }
    if (mode === 'edit') {
      this.editUser = user;
      button.setAttribute('data-target', '#updateUserModal');
    }
    if (mode === 'delete') {
      this.deleteUser = user;
      button.setAttribute('data-target', '#deleteUserModal');
    }
    container?.appendChild(button)
    button.click();
  }

}
