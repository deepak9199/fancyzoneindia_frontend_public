import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartModel } from 'src/app/model/cartModel';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  products!:any
  productCount!:number
  rates:any
  keyword!:string;
  constructor(private service: SearchService, private router: ActivatedRoute, 
    private cartService:CartService,    
     private toast:ToastrService, 
     private userService: AuthService,
     private navigate: Router,


    ) {}
  ngOnInit(): void {
   this.getKey()
  
  }
  getKey(){
    this.router.params.subscribe(params => {
      this.keyword = params['key'];
     console.log(this.keyword);
    
      if (this.keyword) {
        this.getSearchedProducts(this.keyword);
      }
    });
  }
  p: number = 1; // default page number
  pageSize: number = 12; // number of items to display per page
  onPageChange(pageNumber: number): void {
    this.p = pageNumber;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  getSearchedProducts(keyword:string){
    this.service.search(keyword).subscribe(data =>{
      this.products =data
      this.productCount=data.length
    })
  }
  addToCart(item: any): void {
    if (this.userService.isLoggedIn()) {
      const cartItem: CartModel = {
        userId: this.userService.getCurrentUser()?.uid,
        category: item.category,
        price: item.min_price,
        sku: item.sku,
        imageUrl: item.imageUrl[0],
        productSize: "standard size",
        color: "standard color",
        quantity: 1,
      };

      this.cartService.createCart(cartItem);
    } else {
      this.navigate.navigate(['../login']);
    }
  }


}
