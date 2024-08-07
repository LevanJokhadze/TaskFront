import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  uploadStudent: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) 
  {
    this.uploadStudent = this.fb.group({
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      id: ['', [Validators.required]],
      file: ['', [Validators.required]]
    });
  }

  ngOnInit() 
  {
    const token = localStorage.getItem('Token');
    if (!token) {
      this.router.navigate(['/']);
    }
  }


  async onSubmit() 
  {
    const response = await this.apiService.uploadStudent(this.uploadStudent.value.name, this.uploadStudent.value.last_name, this.uploadStudent.value.id);
    console.log('Login Success:', response.data);
  }

}
