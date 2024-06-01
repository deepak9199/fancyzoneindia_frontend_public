import { Component, ElementRef, OnInit } from '@angular/core';
import { OtherServices } from 'src/app/services/Others.Service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  testimonials: any ;
  constructor( private otherService:OtherServices
    ){}
  ngOnInit(): void {

    this.getTestimonials()
    
  }

  getTestimonials() {
    this.otherService.getTestimonial().subscribe(data => {
      this.testimonials = data

      console.log(this.testimonials);
      
    })
  }

}
