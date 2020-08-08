import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { AuthGuard } from './utility/auth.guard.service';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },

  // { path: "home", component: HomeComponent, canActivate: [AuthGuard],
  //   children: [
  //     {
  //       path: 'product-origin',
  //       component: ProductOriginComponent
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
