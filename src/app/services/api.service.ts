import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { environment } from '../../environments/environment';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: environment.BACK_API,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  login(data: { username: string; password: string }, headers?: any) {
    const config: AxiosRequestConfig = {};
    if (headers) {
      config.headers = headers;
    }
    return this.axiosClient.post('/login', data, config);
  }

  register(data: { username: string; token: string; }, headers?: any) {
    const config: AxiosRequestConfig = {};
    if (headers) {
      config.headers = headers;
    }
    console.log(data);
    return this.axiosClient.post('/register', data, config);
  }

  sendEmail(username: string, href: string, headers?: any) {
    let data = {
      'username': username,
      'href': href
    }
    const config: AxiosRequestConfig = {};
    if (headers) {
      config.headers = headers;
    }
    console.log(data);
    return this.axiosClient.post('/email', data, config);
  }

  registerPassword(username: string, data: { password: string }, headers?: any) {
    const config: AxiosRequestConfig = {};
    if (headers) {
      config.headers = headers;
    }
    console.log(data.password);
    return this.axiosClient.post(`/register/${username}`, { password: data.password }, config);
  }

  checkToken(token: string) {
    const config: AxiosRequestConfig = {};
    const data = { 'otp': token };
    return this.axiosClient.post('/check-token', data, config);
  }

  verifyUser(username: string, password: string)
  {
    const config: AxiosRequestConfig = {};
    const data = { 'username': username, 'password': password };
    return this.axiosClient.post('/verify', data, config);
  }

  uploadStudent(name: string, lastName: string, serial: string)
  {
    const config: AxiosRequestConfig = {};
    const data = { 'name': name, 'last_name': lastName, 'serial': serial };
    return this.axiosClient.post('/upload', data, config);
  }

  logout(username: string, headers?: any)
  {
    const config: AxiosRequestConfig = {};

    if (headers) {
      config.headers = headers;
    }
    const data = { 'username': username };
    console.log(data);
    return this.axiosClient.post('/logout', data, config);
  }

  indexStudent()
  {
    const config: AxiosRequestConfig = {};
    return this.axiosClient.post('/students', config);

  }

  downloadWord(text: string): Observable<Blob> {
    const config: AxiosRequestConfig = {
      responseType: 'blob'
    };
    const data = { 'text': text };

    return from(this.axiosClient.post('/edit-document', data, config)).pipe(
      map(response => response.data)
    );
  }

  uploadDocument(selectedFile: File | null, name: string, lastname: string, id: string): Promise<Blob> {
    if (!selectedFile) {
      throw new Error('No file selected');
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('name', name);
    formData.append('lastname', lastname);
    formData.append('id', id);

    console.log(name, lastname, id);

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'blob'
    };

    return this.axiosClient.post('/upload-document', formData, config)
      .then((response: AxiosResponse<Blob>) => response.data);
  }
}
