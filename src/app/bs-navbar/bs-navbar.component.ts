import { AuthService } from './../auth.service';
import { UserService } from './../user.service';
import { ShoppingCartService } from './../shopping-cart.service';
import { AppUser } from './../models/app-user';
import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  user;
  appUser: AppUser;
  cart$: any;
  tog: boolean= false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService) { 
  }

  async ngOnInit(){
    this.authService.user$.subscribe((user) => {
      if(user){
      this.user = user;
      this.userService.get(user.uid).subscribe(appUser => this.appUser= appUser);
      }
    });

    this.cart$ = await this.shoppingCartService.getCart();
  }

  signOut(): void {
    this.authService.signOut()
      .then(res => {this.user = this.appUser = null; console.log("Logged out successfuly");})
      .catch(err => console.log(err));        
  }

  toggleNav(){
    this.tog = !this.tog;
  }

}
