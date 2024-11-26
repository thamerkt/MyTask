// angular import
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserserviceService } from 'src/app/core/services/userservice.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  userData = {
    email: '',
    password: ''
  };

  constructor(private authService: UserserviceService) {}

  login(userData: any): void {
    this.authService.Login(userData).subscribe({
      next: (response) => {
        console.log('Logged in:', response);
        alert('Login successful!');
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Login failed. Please check your credentials.');
      }
    });
  }
}
