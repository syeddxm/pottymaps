import { Component, OnInit } from '@angular/core';
import { FireauthService } from '../../services/fireauth.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PasswordValidator } from '../../validators/password-validator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  emailSignIn = false;
  emailSignUp = false;
  forgotPassword = false;

  signInForm: FormGroup;
  validationsForm: FormGroup;
  resetForm: FormGroup;
  matchingPasswordsGroup: FormGroup;
  error = '';

  validationMessages = {
    displayName: [
      { type: 'required', message: 'First name is required.' },
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Email format is incorrect' }
    ],
    password: [
      { type: 'minlength', message: 'Password must be at least 6 characters' },
      { type: 'required', message: 'Password is required.' }
    ],
    confirm_password: [
      { type: 'required', message: 'Please repeat password.' },
    ],
    PasswordValidator: [
      { type: 'PasswordValidator', message: 'Passwords don\'t match' }
    ]
    };

  constructor(private fireauth: FireauthService, formBuilder: FormBuilder, private router: Router) {

    this.matchingPasswordsGroup = new FormGroup({
      password: new FormControl('', Validators.compose([
         Validators.minLength(6),
         Validators.required,
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
       return PasswordValidator.areEqual(formGroup);
    });

    this.validationsForm = formBuilder.group({
      displayName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      passwords: this.matchingPasswordsGroup
    });

    this.signInForm = formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.required)
    });

    this.resetForm = formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });

  }



  loginWithGoogle() {
    this.fireauth.GoogleAuth().then( () => {
      this.router.navigateByUrl('home');
      },
      error => {
        this.error = error;
      });
  }

  signInWithEmail() {
    const currForm = this.signInForm.value;
    this.fireauth.signInWithEmail(currForm.email, currForm.password).then( () => {
      this.router.navigateByUrl('home');
    },
    error => {
      this.error = error;
    });
  }

  signUpWithEmail() {
    const currForm = this.validationsForm.value;
    this.fireauth.signUpWithEmail(currForm.email, currForm.passwords.password, currForm.displayName).then( () => {
      this.router.navigateByUrl('home');
      },
      error => {
        this.error = error;
      });
  }

  resetPassword() {
    const currForm = this.resetForm.value;
    this.fireauth.resetPassword(currForm.email).then( () => {
      },
      error => {
        this.error = error;
      });
  }

  continueAsGuest() {
    this.router.navigateByUrl('home');
  }

  ngOnInit() {
  }

}
