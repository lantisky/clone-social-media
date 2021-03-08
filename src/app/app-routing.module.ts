import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { CommonModule } from '@angular/common';
import { HomeModule } from './components/home/home.module';
import { FacebookGuard } from './guards/facebook.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [FacebookGuard],
  },
  {
    path: '',
    component: HomeComponent,
    // loadChildren: () => import('./components/login/login.component')
    //   .then(m => m.LoginComponent),
  },
  {
    path: 'register', component: RegisterComponent
  },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),

  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
