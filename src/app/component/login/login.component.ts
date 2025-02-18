import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginServices = inject(AuthService);
  isLoggedIn = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.setFormState();
  }
  ngOnInit(): void {
    this.setFormState();
  }

  setFormState() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      alert('All fields are mandatory');
      return;
    }
  
    // Extract email and password from the form
    const { email, password } = this.loginForm.value;
  
    // Call the login method from the service
    this.loginServices.login({ email, password }).subscribe(
      (response) => {
        if (response && response.token) {
          this.isLoggedIn = true;
          localStorage.setItem('jwt_token', response.token);
          this.router.navigate(['/Members']); // Navigate upon success
        } else {
          alert('Invalid credentials'); // Handle invalid response
        }
      },
      (error) => {
        alert('Login failed. Please try again.'); // Handle error
      }
    );
  }
  
}
