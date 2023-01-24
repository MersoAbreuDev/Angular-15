import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from 'src/guards/guard.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {  path:'login',
    loadChildren:()=> import('./componentes/login/login.module').then((m)=> m.LoginModule)
  },
  {
    path:'dashboard',
    loadChildren:()=>import('./componentes/dashboard/dashboard.module').then((m)=> m.DashboardModule),
    canActivate:[GuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
