import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
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
  Userconncte : ProC2 | undefined ;
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
      nni: ['',[Validators.required]],
      numcomp: ['', [Validators.required]],
      telephone: ['',[Validators.required]],
      pronom: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    
  }


  onSubmit() {

    const nom = this.signUpForm?.get('nom')?.value ;
    const prenom = this.signUpForm?.get('prenom')?.value ;
    const nni = this.signUpForm?.get('nni')?.value ;
    const numcomp = this.signUpForm?.get('numcomp')?.value ;
    const telephone = this.signUpForm?.get('telephone')?.value ;
    const pronom = this.signUpForm?.get('pronom')?.value ;
    const password = this.signUpForm?.get('password')?.value ;
    
    const newProC2 = new ProC2(0,telephone,[0],nom,
    prenom,nni,numcomp,pronom,password);

    console.log(newProC2);
    newProC2.img= null;

     const uploadImage = new FormData()
    uploadImage.append('imageFile', this.selectedFile ,this.selectedFile.name);
    uploadImage.append('proC2', JSON.stringify(newProC2));
     console.log(uploadImage);
 

          
    this.authService.addProC2(uploadImage).subscribe(
      (response) => {
        this.sms = "Compte cree avec succes";
        this.router.navigate(['/principale','auth','signin',this.sms]);
      },
      (error) => {
        this.errorMessage = "inpossible de cree un complte";
        this.isAuth = false;
      }
    );

  }




}