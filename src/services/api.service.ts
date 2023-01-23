import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroments } from 'src/enviroments/enviroments';
import {Observable,  catchError, throwError } from 'rxjs';
import { RegisterUserInterface } from 'src/app/intefaces/registerUserInterface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

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
}
