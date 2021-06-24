import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatToolbarModule} from '@angular/material/toolbar';
import{ MatInputModule} from '@angular/material/input';
import{MatButtonModule} from '@angular/material/button';
    
    import {MatSelectModule} from '@angular/material/select';
import{MatFormFieldModule} from '@angular/material/form-field';
import{ MatCardModule} from '@angular/material/card';
import{MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { ProductService } from './services/product.service';
import { ScrollTrackerDirective } from './directives/scroll-tracker.directive';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductComponent,
    FeedbackComponent,
    HeaderComponent,
    
    ScrollTrackerDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    InfiniteScrollModule,

    MatSelectModule

  
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
