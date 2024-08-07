import { OnInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'Auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLoginView = true;
  loginForm: FormGroup;
  registerForm: FormGroup;
  token: string;

  ngOnInit() {
    let token = localStorage.getItem('Token');
    if (token) {
      this.router.navigate(['/home']);
      console.log(token);
    } else {
      console.log("token");
    }
  }

  constructor(private fb: FormBuilder, private apiService: ApiService, private tokenService: TokenService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });


    this.token = this.tokenService.generateRandomToken(30);

    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      token: this.token
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
      'Authorization': ''
    };

    if (type === 'login') {
      try {
        const response = await this.apiService.login(this.loginForm.value, headers);
        console.log('Login Success:', response.data);
        localStorage.setItem('Token', response.data.access_token);
        headers.Authorization = `Bearer ${response.data.access_token}`;
        setTimeout(async () => {
          localStorage.removeItem('Token');
          this.router.navigate(['/']);
          const response = await this.apiService.logout(this.loginForm.value.username, headers);
          console.log('Logout Success:', response.data);

          console.log('Token has been removed from localStorage');
        }, 60000);
        this.router.navigate(['/home']);
        
      } catch (error) {
        console.log(this.loginForm.value);
        console.error('Login Error:', error);
      }
    } else if (type === 'register') {
      try {
        const response = await this.apiService.register(this.registerForm.value, headers);
        console.log('Register Success:', response.data);

        const authSecond = 'http://localhost:4200/auth-second';


        const result = `${authSecond}/${this.token}`;
        const email = await this.apiService.sendEmail(this.registerForm.value.username, result, headers);

        console.log(email);
      } catch (error) {
        console.log(this.registerForm.value);
        console.error('Register Error:', error);
      }
    }
  }
}
