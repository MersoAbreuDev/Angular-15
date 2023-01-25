import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroments } from 'src/enviroments/enviroments';
import {Observable,  catchError, throwError } from 'rxjs';
import { RegisterUserInterface } from 'src/app/intefaces/registerUserInterface';
import { LoginUserInterface } from 'src/app/intefaces/loginUserInterface';
import { UtilsService } from './utils.service';
import { DownloadImage } from 'src/app/intefaces/downloadImage';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private utilsService: UtilsService) { }

  registerUser(user: any): Observable<RegisterUserInterface>{
    const formData = new FormData();

    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('age', user.age);
    formData.append('image', user.image);
    formData.append('password', user.password);
    formData.append('confirmPassword', user.confirmPassword);

    return this.http.post<RegisterUserInterface>(enviroments.BASE_URL+ '/auth/register/user', formData)
    .pipe(
      catchError((err)=>{
        if(err.status === 0 && err.status !== 404){
          console.error('Ocorreu um erro na aplicação, tente novamente!')
        }else if(err.status === 404){
          console.error(err.error.message)
        }else{
          console.error("Ocorreu um erro no servidor, tente mais tarde!")
        }
        return throwError(()=> err)
      })
    )
  }

  loginUser(user:any):  Observable<LoginUserInterface>{
    return this.http.post<LoginUserInterface>(enviroments.BASE_URL+ '/auth/login', user)
    .pipe(
        catchError((err)=>{
          if(err.status === 0 && err.status !== 404){
            this.utilsService.showError('Ocorreu um erro na aplicação, tente novamente!')
          }else if(err.status === 404){
            this.utilsService.showError(err.error.message)
          }else{
            this.utilsService.showError("Ocorreu um erro no servidor, tente mais tarde!")
          }
          return throwError(()=> err)

        })
    )
  }

  downloadImage(imgName: string): Observable<DownloadImage>{
    const headers =  new HttpHeaders().set('imgName', imgName)

    return this.http.get<DownloadImage>(enviroments.BASE_URL+ '/download/image', {headers})
    .pipe(
        catchError((err)=>{
          if(err.status === 0 && err.status !== 404){
            this.utilsService.showError('Ocorreu um erro na aplicação, tente novamente!')
          }else if(err.status === 404){
            this.utilsService.showError(err.error.message)
          }else{
            this.utilsService.showError("Ocorreu um erro no servidor, tente mais tarde!")
          }
          return throwError(()=> err)

        }
      )
    )
  }
}
