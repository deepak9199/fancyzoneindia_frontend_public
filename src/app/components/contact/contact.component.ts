import { Component, ElementRef, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @ViewChild('contactForm') contactForm!: NgForm;

  contact ={
    name:'',
    subject:'', 
    contact: '',
    email: '',
    message:''
  };
  constructor(
    private firestore:AngularFirestore,
    private toastr:ToastrService

    ){}


  async submitForm() {
    if (this.contactForm.valid) {
      await this.firestore.collection('contacts').add({
        name:this.contact.name,
        subject:this.contact.subject,
        contact:this.contact.contact,
        email:this.contact.email,
        message :this.contact.message,
     
      });
      this.toastr.success("Enquiry sent!")
    }else this.toastr.error('Something Went wrong!')
  }
}

