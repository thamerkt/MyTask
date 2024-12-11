import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Required for ngModel to work
import { user } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, CommonModule,FormsModule], // Importing CommonModule for ngModel
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent {
  
  userData: user = {
    
    fullName: '',
    email: '',
    password: "",
    phone: '',
    c_password: "",
  };

  constructor(private authService: UserService) {}

  signUp(): void {
    this.authService.register(this.userData).subscribe({
      next: (response: any) => {
        console.log('User registered:', response);
        alert('Registration successful!');
      },
      error: (error: string) => {
        console.error('Error:', error);
        alert('Registration failed.'+error);
      },
    });
  }
}
