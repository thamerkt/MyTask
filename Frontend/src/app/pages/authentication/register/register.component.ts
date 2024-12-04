import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Required for ngModel to work
import { user } from 'src/app/core/models/user.model';
import { UserserviceService } from 'src/app/core/services/userservice.service';
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

  constructor(private authService: UserserviceService) {}

  signUp(): void {
    this.authService.register(this.userData).subscribe({
      next: (response) => {
        console.log('User registered:', response);
        alert('Registration successful!');
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Registration failed.'+error);
      },
    });
  }
}
