import { Component,Inject, OnInit,ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from '../shared/feedback';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective:any;
  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  ngOnInit(): void {
  }
  feedbackForm!:FormGroup;
  feedback!:Feedback;
  formErrors={
    name:'',
    email:'',
    phone:'',
    message:'',
  };
  validationMessages={
    'name':{
      'required':'Name is required',
      'minlength':     ' Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 25 characters long.',
      'pattern':'Name should not contain numbers '
    },
    'email':{
      'required':      'Email is required.',
      'email':         'Email not in valid format.',
      'pattern': 'Email should be like ex: test@test.test.'
    },
    'phone':{
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must be in proper format.',
      
      'maxlength':     'Phone number cannot be more than 10 digits long.',
    },
    'message':{
      'required':'Message is required',
      
      
    }
  };
  createForm(){
    this.feedbackForm=this.fb.group({
      name:['',[Validators.required,Validators.minLength(2),Validators.maxLength(13)],Validators.pattern],
      email:['',[Validators.required,Validators.email,Validators.pattern]],
      phone:['',[Validators.required,Validators.pattern,Validators.maxLength(10)]],
      message:['',[Validators.required]]
    });
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); 
  }
  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        console.log('this.formErrors',this.formErrors,this.formErrors,field, typeof field);
        
        (this.formErrors as any)[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = (this.validationMessages as any)[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
          const messages = (this.validationMessages as any)[field];
              (this.formErrors as any)[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  onSubmit(){
    this.feedback=this.feedbackForm.value;
    //console.log(this.feedback);
    //console.log(JSON.stringify(this.feedback))
    let localStorageArr=localStorage.getItem('Feedback');
    let feedbackArray=[];
    if (localStorageArr)
    {
      feedbackArray=JSON.parse(localStorageArr);
    }
    
    feedbackArray.push(this.feedback);
    localStorage.setItem("Feedback",JSON.stringify(feedbackArray));
    this.feedbackForm.reset(
      {
        name: '',
        email: '',
        phone:'',
        message: ''
      }
    );
    this.feedbackFormDirective.resetForm();
  }
}
