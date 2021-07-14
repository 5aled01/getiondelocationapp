import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { Client } from 'src/app/models/client';
import { ProC2 } from 'src/app/models/proc2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  signUpForm!: FormGroup ;
  errorMessage: string | undefined  ;
  Userconncte : Client | undefined ;
  public username : any;
  public password : any;
  isAuth : boolean = false;
  sms! :string ;

  selectedFile!: File;
  retrievedImage: any;
   base64Data: any;
    retrieveResonse: any;
    message!: string;
    imageName: any;
  
  constructor(private formBuilder: FormBuilder,private authService: AuthService,
    private router: Router) { 

      /*this.router.events.subscribe(event =>{
        if(Cookie.get('isAuth') == 'true'){
          if(Cookie.get('type') == 'user')
             this.router.navigate(['/menu']);
             this.router.navigate(['/principale']);
        }
      })
      */
    }

  ngOnInit(): void {
    
    this.initForm();
  }

  public onFileChanged(event:any) {
    this.selectedFile = event.target.files[0];
  }
  

  initForm() {
    this.signUpForm = this.formBuilder.group({
      nom: ['',[Validators.required]],
      prenom: ['', [Validators.required]],
      authNom: ['', [Validators.required]],
      nni: ['',[Validators.required]],
      telephone: ['',[Validators.required]],
      password: ['', [Validators.required]],
    });
   
  }


  onSubmit() {

    const nom = this.signUpForm?.get('nom')?.value ;
    const prenom = this.signUpForm?.get('prenom')?.value ;
    const authNom = this.signUpForm?.get('authNom')?.value ;
    const nni = this.signUpForm?.get('nni')?.value ;
    const telephone = this.signUpForm?.get('telephone')?.value ;
    const password = this.signUpForm?.get('password')?.value ;
    
    const newClient = new Client(0,nom,
      prenom,authNom,nni,telephone,password,[0]);

    console.log(newClient);
    newClient.image= null;

     const uploadImage = new FormData()
    uploadImage.append('imageFile', this.selectedFile ,this.selectedFile.name);
    uploadImage.append('client', JSON.stringify(newClient));
     console.log(uploadImage);
 

          
    this.authService.addClient(uploadImage).subscribe(
      (response) => {
        this.sms = "Compte cree avec succes";
        this.router.navigate(['/principale','auth','signin',this.sms]);
      },
      (error) => {
        this.errorMessage = "Impossible de créer un compte:";
        this.isAuth = false;
      }
    );

    }




}
