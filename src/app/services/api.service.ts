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
}
