import { ActionToken } from './../config/action-token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../config/constants';
import { HttpReponse } from '../models/response/http-reponse';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http : HttpClient,
  ) { }

  getEmployee() {
    return this.http.get(Constants.baseURL + "/employee").pipe();
  }


  /*
    Lấy thông tin tài khoản đăng nhập
  */ 
  // getInformationUser() {
  //   return this.http.get(Constants.baseURL + "/user").pipe();
  // }
}
