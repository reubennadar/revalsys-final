import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { Product } from '../shared/product';
import { Products } from '../shared/products';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
   productsSubject = new BehaviorSubject<Array<string>>([]);
   sortTypeSubject = new BehaviorSubject('hightolow');

  products$ = this.productsSubject.asObservable();
  products: Array<string> = [];
  allProducts: Array<any> = Products;
  sortType ="hightolow";
  constructor() {
    console.log('Products',Products.length);
    
    this.sortTypeSubject.subscribe((filter)=>{
      console.log('aaaaaaaaaaaaaaaaaaaaa',filter);
      
      this.sortType =filter;
    this.products =[];

      this.getNextItems();
    this.productsSubject.next(this.products);
    })
   }
  // getProducts():Product[]{
  //   return Products;
  // }

  loadMore(): void {
    
    if (this.getNextItems()) {
      this.productsSubject.next(this.products);
    }
  }

  getNextItems(): boolean {
    console.log('filter',);
   
    
    if (this.products.length >= this.allProducts.length) {
      return false;
    }
    console.log('this.allProducts',this.allProducts);
    this.getSortedProducts();
    // this.allProducts = this.getSortedProducts()
    const remainingLength = Math.min(12, this.allProducts.length - this.products.length);
    this.products.push(...this.allProducts.slice(this.products.length, this.products.length + remainingLength));
    console.log('this.products',this.products);
    
    return true;
  }

  getSortedProducts(){
    console.log('this.sortType ',this.sortType );
    
    if(this.sortType==="lowtohigh"){
      this.allProducts.sort(function(a,b){
        return a.Price - b.Price;
    })}
    else{
      this.allProducts.sort(function(a,b){
        return b.Price - a.Price;
    })
    }
    console.log('this.allProducts sorted',this.allProducts);

    }
    
    // return this.allProducts;

  // }
}
