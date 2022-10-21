import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { MapComponent } from './map/map.component';
import { UserDataComponent } from './user-data/user-data.component';

const routes: Routes = [
  {path:'', component:IntroComponent},
  {path:'dashboard', component:UserDataComponent},
  {path:'map', component:MapComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
