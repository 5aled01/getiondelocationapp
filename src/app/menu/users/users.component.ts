import { HttpErrorResponse } from '@angular/common/http';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';


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
  

  constructor(private userService: UserService) { }

  ngOnInit(){
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        this.retrieveResonse = this.users[0].image;
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        
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

      

  public onAddUser(addForm: NgForm): void {
    document.getElementById('add-user-form').click();
   /* const formvalue =addForm.value ;
    const newuser = new User(0,formvalue['username'],formvalue['password'],
    formvalue['role'],[0],formvalue['phone']);

     newuser.image=this.base64Data;
    
     console.log(this.onUpLoad());>
*/

console.log(this.selectedFile);
            const uploadImageData = new FormData();
        
            uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
        
    this.userService.addUser(addForm.value,uploadImageData).subscribe(
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

  public onUpdateUser(employee: User): void {
    this.userService.updateUser(employee).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
      ||user.phone !== -1
      || user.role.toLowerCase().indexOf(key.toLowerCase()) !== -1
       ) {
        results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !key) {
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
