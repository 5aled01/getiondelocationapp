import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
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
  
  signInForm: FormGroup;
  errorMessage: string | undefined;
  Userconncte : User ;
  

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {

                if (Cookie.get('islogin') === 'true') {
                  this.router.navigate(['/menu']);
                }
                
               }

  ngOnInit() {
    this.initForm();
  }



  initForm() {
    this.signInForm = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['', [Validators.required]]
    });

    
  }


  onSubmit() {

    const username = this.signInForm.get('username').value ;
    const password = this.signInForm.get('password').value ;
    
 
    this.authService.signInUser(username, password).then(
      () => {
       
      },
      (error) => {
        this.errorMessage = error;

      }
    );
  }

}
