import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-continuation-register',
  templateUrl: './continuation-register.component.html',
  styleUrls: ['./continuation-register.component.scss']
})
export class ContinuationRegisterComponent implements OnInit{
  form!:FormGroup;
  constructor(
     @Inject(MAT_DIALOG_DATA) public data:any,
     private fb:FormBuilder){

  }

  ngOnInit(): void {
  this. initForm();

  }

  initForm(){
    this.form = this.fb.group({
      name:[this.data.data?.name, [Validators.required]],
      email:[this.data.data?.email, [Validators.required]],
      age:[this.data.data?.age, [Validators.required]],
      avatar:[null, Validators.required],
      password:[null, Validators.required],
      confirmPassword:[null, Validators.required]
    })
  }

}
