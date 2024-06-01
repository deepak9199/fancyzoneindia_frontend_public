import { Component, OnInit } from '@angular/core';
import { OtherServices } from './services/Others.Service';
import { CartService } from './services/cart.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private service: OtherServices, private cartservice :CartService) {}
  ngOnInit(): void {
  }
  getcolor(){
    this.service.getworkinghours().subscribe((data) => {
    });
  }

}
