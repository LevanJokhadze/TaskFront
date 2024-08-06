import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-auth2',
  templateUrl: './auth2.component.html',
  styleUrl: './auth2.component.scss'
})
export class Auth2Component {
  passwordForm: FormGroup;


  constructor(private fb: FormBuilder, private apiService: ApiService) {

  this.passwordForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  });
}
async onSubmit(type: string): Promise<void> {

  if (type === "registerPassword") {
    try {
      const passwordData = { password: this.passwordForm.value.password };
      // const response = await this.apiService.registerPassword(this.registerForm.value.username, passwordData, headers);
      // console.log('Register Success:', response.data);
    } catch (err) {
      console.log(this.registerForm.value.password);
      console.error('Register Error:', err);
    }
  }
}
}
