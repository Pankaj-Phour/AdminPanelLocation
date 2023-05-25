import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { MapComponent } from './map/map.component';
import { UserDataComponent } from './user-data/user-data.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:'', 
  component:IntroComponent
},
  {path:'dashboard', 
  component:UserDataComponent,
  canActivate : [AuthGuard]
},
  {path:'map',
   component:MapComponent,
   canActivate : [AuthGuard]
  },
  {path:'**',
   redirectTo : '',
  },
];

@NgModule({
  // Added Hashrouting to navigate smoothly on different pages on server on january 23 2023 
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
