import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';  // Import Router
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  userData = {
    email: '',
    password: ''
  };

  constructor(private authService: UserService, private router: Router) {}  // Inject Router here

  login(userData: any): void {
    this.authService.login(userData).subscribe({
      next: (response: any) => {
        console.log('Logged in:', response);

        const token = response.token;
        
        // Store token in localStorage
        localStorage.setItem('auth_token', token); 

        // Navigate to the dashboard
        this.router.navigate(['/dashboard']);

        alert('Login successful!');
      },
      error: (error: any) => {
        console.error('Error:', error);
        alert('Login failed. Please check your credentials.');
      }
    });
  }
}
