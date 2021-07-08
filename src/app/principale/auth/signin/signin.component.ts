import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router ,ActivatedRoute  } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css','./bg3.png',
  './signin.component.css','./bg2.jpg'] 
}) 

export class SigninComponent implements OnInit {
  
  signInForm !: FormGroup;
  errorMessage: string | undefined  ;
  Userconncte : User | undefined ;
  public username : any;
  public password : any;
  public type : any;
  isValide : boolean = false;
  sms!: string;
  

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,private route :ActivatedRoute ) {
/*
                this.router.events.subscribe(event =>{
                  if(Cookie.get('isUserAuth') == 'true'){ 
                       this.router.navigate(['/menu']);
                  }
                     if(Cookie.get('isProc2Auth') == 'true')
                     {
                       this.router.navigate(['/principale']);
                      }   
              })
            */            }
                
               

  ngOnInit() {
    this.initForm();
   this.sms = this.route.snapshot.params["sms"];
   }
    
   
  

  get f() { return this.signInForm.controls; }

  initForm() {
    this.signInForm = this.formBuilder.group({
      username: ['',[Validators.required]],
      password: ['', [Validators.required]],
      type : ['', [Validators.required]]
    });

    
  }


  onSubmit() {

    const type = this.signInForm.get('type')?.value ;
if(type == 'user'){
    const username = this.signInForm.get('username')?.value ;
    const password = this.signInForm.get('password')?.value ;
    this.authService.signInUser(username, password).then(
      () => {
      
      },
      (error) => {
        this.errorMessage = "mot de pass ou user nom incorrect";
        this.isValide = false;
      }
    );
  }


if(type == 'proprietaire'){
  const username = this.signInForm.get('username')?.value ;
  const password = this.signInForm.get('password')?.value ;
  this.authService.signInProC2(username, password).then(
    () => {
    
    },
    (error) => {
      this.errorMessage = "mot de pass ou user nom incorrect";
      this.isValide = false;
    }
  );
}

if(type == 'client'){

  const username = this.signInForm.get('username')?.value ;
  const password = this.signInForm.get('password')?.value ;
  this.authService.signInClient(username, password).then(
    () => {
    
    },
    (error) => {
      this.errorMessage = "mot de pass ou user nom incorrect";
      this.isValide = false;
    }
  );
  
}

}

}

