import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }
  user={username:'',password:''}
  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.user);
    this.router.navigate(['/list'],{ queryParams: { sortType:"hightolow" } });
    
  }
}
