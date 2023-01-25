import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../../../../services/localstorage.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from '../../../../services/api.service';
import { DownloadImage } from '../../../intefaces/downloadImage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{
  messageHour!:string;
  showNameUser!:string;
  isDefaultImage = '../../../../assets/imagem/default.png';
  imageUser!: SafeResourceUrl;

  
  constructor(private localStorageService: LocalstorageService,
    private apiService: ApiService,
    private sanatizer: DomSanitizer,
    private router: Router){

  }
  ngOnInit(){
   this.getNameUser();
   this.getImageUser();
  }

  getImageUser(){
    const nameImage = this.localStorageService.getLocalStorage('useInfo')
    this.apiService.downloadImage(nameImage.image).subscribe((res:DownloadImage)=>{
      let url = 'data:image/jpg;base64,' + res.image;
      this.imageUser = this.sanatizer.bypassSecurityTrustResourceUrl(url)
    });
  }

  getMessageHour(message: string){
   this.messageHour = message;
  }

  getNameUser(){
   const nameUser = this.localStorageService.getLocalStorage('useInfo')
    this.showNameUser = nameUser.name;
  }

  logout(){
    this.localStorageService.removeLocalStorage('token')
    this.router.navigate(['/']);
  }
}
