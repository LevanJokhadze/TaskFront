import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  @ViewChild('fileInput') fileInput?: ElementRef;
  selectedFile: File | null = null;
  uploadStudent: FormGroup;
  data: any[] = [];

  name = 'First';
  lastName = 'Second';
  serial = 'Third';
  formattedText?: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService,
  )
  {
    this.uploadStudent = this.fb.group({
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      id: ['', [Validators.required]],
      file: ['', [Validators.required]]
    });
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  async ngOnInit() {

    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('Token');
      if (!token) {
        this.router.navigate(['/']);
        return;
      }
    } else {
      this.router.navigate(['/']);
      return;
    }

    const response = await this.apiService.indexStudent();
    this.data = response.data;
    console.log('Login Success:', response.data);
  }


  async onSubmit()
  {
    const response = await this.apiService.uploadStudent(this.uploadStudent.value.name, this.uploadStudent.value.last_name, this.uploadStudent.value.id);
    console.log('Login Success:', response.data)
  }


  async onSubmitUpload(name: string, lastname: string, id: string) {
    if (!this.selectedFile) {
      console.error('No file :(');
      return;
    }

    try {
      const blob = await this.apiService.uploadDocument(
        this.selectedFile,
        name,
        lastname,
        id
      );
      this.downloadFile(blob);
    } catch (error) {
      console.error('dagerxa:', error);
    }
  }

  private downloadFile(blob: Blob) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `modified_${this.selectedFile!.name}`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

}
