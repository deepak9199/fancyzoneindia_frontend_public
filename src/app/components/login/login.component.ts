import { Component, OnInit } from '@angular/core';
import {  Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email = '';
  password = '';
  isSingIn=false;
  constructor(private auth:AuthService, private toastr:ToastrService, private router:Router) {}
  ngOnInit(): void {
    if(localStorage.getItem('user')!== null)
      this.isSingIn =true;
     else
     this.isSingIn =false
  }

  async login() {
    await this.auth.Login(this.email, this.password)
    if(this.auth.isLoggedInUser)
      this.isSingIn = true
  }



}