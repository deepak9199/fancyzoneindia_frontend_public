import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = {
    name: '',
    email: '',
    password: '',
    contact: ''
  };
  isSingIn =false;
  @ViewChild('registrationForm') registrationForm!: NgForm;
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private toastr:ToastrService,
    private router:Router,
    private authservice:AuthService
  ) {}
  ngOnInit(): void {
    if(localStorage.getItem('user')!== null)
    this.isSingIn =true;
   else
   this.isSingIn =false
  }


  register() {
    this.auth
      .createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then((userCredential) => {
        const newUser = {
          uid: userCredential.user?.uid,
          email: userCredential.user?.email,
          name: this.user.name,
          createdTime: new Date(),
          contact: this.user.contact
        };
        this.firestore.collection('users').doc(userCredential.user?.uid).set(newUser);
        if(this.authservice.isLoggedInUser)
        this.isSingIn = true
        this.toastr.success("Sucessfully registered")
        this.registrationForm.resetForm();
        this.router.navigate(['../login'])
      })
      .catch((error) => this.toastr.error('something went wrong try again'));
  }
}