import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileImgComponent } from './pages/edit-profile-img/edit-profile-img.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SuccessPageComponent } from './pages/success-page/success-page.component';

const routes: Routes = [
  {path:"" , component:HomeComponent},
  {path:'login' , component:LoginComponent},
  {path:'successLogin' , component:SuccessPageComponent},
  {path:"edit-profile" , component:EditProfileImgComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }