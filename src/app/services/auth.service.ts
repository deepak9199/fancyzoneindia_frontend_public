import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    users!: Observable<firebase.User>
    user!:firebase.User | null
    authState: any;
    isLoggedInUser=false;
    constructor(
        private auth: AngularFireAuth,
        private firestore: AngularFirestore,
        private toastr: ToastrService,
        private router: Router
    ) {
        this.auth.authState.pipe(
            map(user => {
              if (user) {
                this.user = user;
              } else {
                this.user = null;
              }
            })
          ).subscribe();
     }

     async Login(email: string, password: string) {
      await this.auth.signInWithEmailAndPassword(email, password).then((res) => {
        this.isLoggedInUser = true;
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/home']);
      });
    }
    async register(email: string, password: string) {
      await this.auth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          this.isLoggedInUser = true;
          localStorage.setItem('user', JSON.stringify(res.user));
        });
    }
  
    logout() {
      this.auth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      });
    }

    getCurrentUser() {
        return this.user;
      }
    
    
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

}
