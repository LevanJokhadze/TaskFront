import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth2',
  templateUrl: './auth2.component.html',
  styleUrls: ['./auth2.component.scss']
})
export class Auth2Component implements OnInit {
  username?: string | null;
  password?: string | null;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) 
  { 
    this.registerForm = this.fb.group({
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async params => {
      const hash = params.get('token');
      if (hash) {
        console.log('Captured Hash:', hash);

        try {
          const response = await this.apiService.checkToken(hash);
          if (response.data.success) {
            let username = response.data.data.username;
            this.username = username;
            console.log(username);
          } else {
            this.username = null;
          }
          // console.log('Login Success:', response.data);
        } catch (error) {
          console.error('Login Error:', error);
        }
      }
    });
  }

  async onSubmit(): Promise<void> {
    if (this.username) 
    {
      try {
        if (this.registerForm.value.password === this.registerForm.value.repeatPassword) {
          const response = await this.apiService.verifyUser(this.username, this.registerForm.value.password);
          this.router.navigate(['/']);
          console.log('Login Success:', response.data);
        } else {
          console.log('Login Failed, Passwords do not match!');
        }
      } catch (error) {
        console.error('Login Error:', error);
      }
    }
  }
}
