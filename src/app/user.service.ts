import { SocialUser } from 'angular4-social-login';
import { AppUser } from './models/app-user';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase'; 

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    });
  }

  get(uid: string): FirebaseObjectObservable<AppUser> { 
    return this.db.object('/users/' + uid);
  }

  getAll(){
    return this.db.list('/users');
  }
}
