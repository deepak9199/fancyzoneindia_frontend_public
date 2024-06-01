import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { CategoryService } from 'src/app/services/categoryService';
import { ProductsService } from 'src/app/services/productService';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  categories: any[] = [];
  selectedCategory: string = "Cotton shirt";
  products: any[] = [];
  countProduct!:number;
  subscription: Subscription = new Subscription();
  p: number = 1; // default page number
  pageSize: number = 12; // number of items to display per page
  selectedVariants: any;
  userId: any;
  @ViewChild('selectedProduct', { static: false }) selectedProduct!: ElementRef;

  constructor(
    private services: ProductsService,
    private catService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.activatedRoute.queryParams.subscribe(params => {
      this.selectedCategory = decodeURIComponent(params['category'] || "Cotton shirt");
      this.getProductsByCategory();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onPageChange(pageNumber: number): void {
    this.p = pageNumber;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getCategories(): void {
    this.subscription.add(
      this.catService.getCategories().subscribe((data) => {
        this.categories = data;
      })
    );
  }

  updateSelectedCategory(selected: any): void {
    this.selectedCategory = selected.category;
    this.getProductsByCategory();
    this.p = 1;
  }

  getProductsByCategory(): void {
    this.subscription.add(
      this.services.getProductsByCategory(this.selectedCategory).subscribe((data) => {
        this.products = data;
        this.p = 1;
        this.countProduct =this.products.length
      })
    );
  }



}
