import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  isLoginMode = true;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

onSubmit(form: NgForm) {

  if( !form.valid ) {
    return;
  }

  const email = form.value.email;
  const password = form.value.password;
  const fullname = form.value.fullname;
  const username = email.split('@')[0];

  if( this.isLoginMode ) {
    // ...
  } else {
    
    this.authService.signup(email, password, fullname, username).subscribe(resData => {
      console.log(resData)
    }, error => {
      console.log(error)
    });
  }

  // form.reset()
}

}
