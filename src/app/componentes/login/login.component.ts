import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContinuationRegisterComponent } from '../continuation-register/continuation-register.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/services/api.service';
import { LocalstorageService } from '../../../services/localstorage.service';
import { LoginUserInterface } from '../../intefaces/loginUserInterface';
import { Subject, takeUntil } from 'rxjs';
import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  formRegister!:FormGroup;
  formLogin!:FormGroup;
  destroy$:Subject<boolean> = new Subject;
  constructor(private fb:FormBuilder,
              private dialog:MatDialog,
              private apiService: ApiService,
              private localStorageService: LocalstorageService,
              private utilsService: UtilsService,
              private router: Router
               ){
  }
  ngOnInit() {
  this.initForms();
  console.log(this.getValueControl(this.formRegister, 'name'))
  }

  initForms(){
    this.formRegister = this.fb.group({
      name:[null, Validators.required],
      email:[null, Validators.required],
      age:[null, Validators.required]
    })

    this.formLogin = this.fb.group({
      email:[null,[ Validators.required, Validators.email]],
      password: [null, [Validators.required]]
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
    return form.controls[control].value;
  }


  login(){
    if(this.isValidForm()){
      const {email} = this.createdPayload();
      this.apiService.loginUser(this.createdPayload())
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: LoginUserInterface) => {
        let {token} = res;
        this.localStorageService.setLocalStorage('token', JSON.stringify(token))
        this.localStorageService.setLocalStorage('user', JSON.stringify(email))
        this.utilsService.showSuccess('Login efetuado com sucesso!')
        this.navigateURL('dashboard');
      })
    }
  }

  navigateURL(url: string){
    this.router.navigate([`/${url}`])
  }

  createdPayload(
    email = this.getValueControl(this.formLogin, 'email'),
    password = this.getValueControl(this.formLogin, 'password')
  ){
    const payload ={
      email,
      password
    }
    return payload;
  }

  isValidForm():boolean{
    return this.formLogin.valid;
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
