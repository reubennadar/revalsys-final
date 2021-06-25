import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../shared/product';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products!:any[];
  filters: any = [
    {
      label: "High to Low",
      value: "hightolow"
    },
    {
      label: "Low to High",
      value: "lowtohigh"
    }
    
  ];
  selectedFilter: string ="";
  

  constructor(private productService:ProductService, private cd: ChangeDetectorRef, private router: Router,private activatedRoute: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const sortType = params['sortType'];
      this.selectedFilter =sortType;
      console.log(sortType);
      this.productService.sortTypeSubject.next(sortType);

    });
    this.productService.products$.subscribe((res)=>{
      console.log('res hcsssssssssssssss',res);
      
     this.products =res;
     this.products.forEach((ele)=>{
       ele.ImagesList =[];
       console.log('ele',ele,ele.Images.split('|'));
       let list = ele.Images.split('|');
       
       list.forEach((img: any)=>{
         
         ele.ImagesList.push(
            img
         )
     
       console.log('ekeeeeeeeeeeeeeeeeeeeeeeeeeeeee',ele);
       
     })
     ele.imgIndex =0;
     ele.img = ele.ImagesList[0];

   });

  })
}

toggleImg(i: any){
  let list = this.products[i].Images.split('|');

this.products[i].imgIndex = (this.products[i].imgIndex + 1) % this.products[i].ImagesList.length;

this.products[i].img = this.products[i].ImagesList[this.products[i].imgIndex];

 

}
  onChangeFilter(e: any){
    console.log('e',e.value);
    this.router.navigateByUrl('/list?sortType='+e.value);
    
  }
  onScroll(e: any) {
    setTimeout (() => {
    this.productService.loadMore();
    }, 500)
  }
 
  // setImage(){
  // console.log('sssssssssssssssss',);
  // this.products.forEach((ele)=>{
  //   console.log('ele',ele.ImagesList);
  //   let foundActiveImg = false;
  //   ele.ImagesList.forEach((imgObj: any)=>{
  //     console.log(imgObj,imgObj);
  //     if(imgObj.isActive){
  //       foundActiveImg = true
  //     }
  //     if(foundActiveImg){
  //       ele.img = imgObj.img
  //       foundActiveImg = false;
  //     }
      
  //   })
  //   console.log('sssssssssssssssssss',ele.img);
  //  this.cd.markForCheck()
    
  // })
    
  // }

}
