import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import RegisterComponent from './pages/authentication/register/register.component';
import LoginComponent from './pages/authentication/login/login.component';
import { DashbordComponent } from './pages/dashbord/dashbord.component';
 // Ensure the component is imported

 const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'login', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashbord', component: DashbordComponent },
  { path: 'dashbord', redirectTo: '/dashbord', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
