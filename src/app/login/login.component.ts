import { AuthService } from './../auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angular4-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private myAuth: AuthService, private route: ActivatedRoute ) {}
  
  login(provider){
    this.myAuth.login(provider);
  }
}
