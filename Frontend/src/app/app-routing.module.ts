import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import RegisterComponent from './pages/authentication/register/register.component';
import LoginComponent from './pages/authentication/login/login.component';
import { DashbordComponent } from './pages/dashbord/dashbord.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  
  { path: 'login', component: LoginComponent },
  
  { path: 'dashboard', component: DashbordComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
