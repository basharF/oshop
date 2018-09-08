import { FacebookLoginProvider } from 'angular4-social-login';
import { UserService } from './user.service';
import { AppUser } from './models/app-user';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of'; 
import * as firebase from 'firebase'; 

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private router: Router,
    private userService: UserService,
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute) { 
    this.user$ = afAuth.authState;  
  }

  login(provider: string) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    if(provider === 'fb') this.signInWithFB()
      .then(res => { console.log('sssssss'); this.router.navigate([returnUrl]);})
      .catch(err => alert("Error..if you have logged in with google before.. please don't switch to facebook provider beacause I'm also a human and it's imposible to fix every bug in the app :)" ));

    else if(provider === 'google') this.signInWithGoogle().
      then(res => this.router.navigate([returnUrl]))
      .catch(err => console.log());

  }

  signInWithFB(){
    console.log("in method");
    
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  signInWithGoogle(){
    return this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  signOut(){
    return this.afAuth.auth.signOut();
  }

  logout() { 
    this.afAuth.auth.signOut();
  }

  get appUser$() : Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user) return this.userService.get(user.uid);

        return Observable.of(null);
      });    
  }
}
