import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContinuationRegisterComponent } from '../continuation-register/continuation-register.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formRegister!:FormGroup;

  constructor(private fb:FormBuilder,
              private dialog:MatDialog){
  }
  ngOnInit(): void {
  this.initForms();
  console.log(this.getValueControl(this.formRegister, 'name'))
  }

  initForms(){
    this.formRegister = this.fb.group({
      name:[null, Validators.required],
      email:[null, Validators.required],
      age:[null, Validators.required]
    })
  }
  openDialogRegister(){
    this.dialog.open(ContinuationRegisterComponent,{
      width:'600px',
      autoFocus:false,
      maxHeight:'90vh',
      data:{
        data:this.createDataDialog()
      }
    })
  }

  createDataDialog(
    name = this.getValueControl(this.formRegister, 'name'),
    email = this.getValueControl(this.formRegister, 'email'),
    age = this.getValueControl(this.formRegister, 'age')
  ){

    const dataDialog = {
      name,
      email,
       age
    }
    return dataDialog;
  }

  getValueControl(form:FormGroup, control:string){
    return this.formRegister.controls[control].value;
  }


}