import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { environment } from '../../environments/environment';

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

  register(data: { username: string; }, headers?: any) {
    const config: AxiosRequestConfig = {};
    if (headers) {
      config.headers = headers;
    }
    return this.axiosClient.post('/register', data, config);
  }

  registerPassword(username: string, data: { password: string }, headers?: any) {
    const config: AxiosRequestConfig = {};
    if (headers) {
      config.headers = headers;
    }
    console.log(data.password);
    return this.axiosClient.post(`/register/${username}`, { password: data.password }, config);
  }
}
