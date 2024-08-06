import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'Auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLoginView = true;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
    });


  }


  toggleView(view: string): void {
    if (view === 'login') {
      this.isLoginView = true;
    } else {
      this.isLoginView = false;
    }
  }

  async onSubmit(type: string): Promise<void> {
    const headers = {
      'Custom-Header': 'value'
    };

    if (type === 'login') {
      try {
        const response = await this.apiService.login(this.loginForm.value, headers);
        console.log('Login Success:', response.data);
      } catch (error) {
        console.log(this.loginForm.value);
        console.error('Login Error:', error);
      }
    } else if (type === 'register') {
      try {
        const response = await this.apiService.register(this.registerForm.value, headers);
        console.log('Register Success:', response.data);
        this.isLoginView = false;

      } catch (error) {
        console.log(this.registerForm.value);
        console.error('Register Error:', error);
      }
    }
  }
}
