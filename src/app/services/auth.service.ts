import { ActionToken } from './../config/action-token';
import { UserResponse } from './../models/response/user-response';
import { UserRequest } from './../models/request/user-request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Constants } from '../config/constants';
import * as jwt_decode from 'jwt-decode';
import { Menu } from '../models/response/menu';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  // Xác định đã đăng nhập chưa ?. Mặc định sẽ đập token ra kiểm tra 
  isLogin = new BehaviorSubject<boolean>(ActionToken.expirationToken())
  currentLogin = this.isLogin.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : boolean {
    // Lắng nghe khi có thay đổi login();
    let logged = false;
    this.currentLogin.subscribe(
      data => logged = data
    )

    // Kiểm tra đã login chưa?
    if(logged) {
      return true;
    }

    // Chưa đăng nhập thì chuyển về trang login
    this.router.navigate(['/login']);
    return false;
  }

  /*
    Function Kiểm tra đăng nhập vào hệ thống
    Trả về token nếu thành công
  */ 
  login(userRequest : UserRequest) {
    return this.http.post(Constants.baseURL + "/login", userRequest).pipe();
  }

  /*
    Cập nhật trạng thái đã đăng nhập trên client
  */ 
  logged(isLogin : any) {
    this.isLogin.next(isLogin);
  }

  /*
    Login khỏi hệ thống
    Xóa session login
    Xóa session token
    Chuyển về trang login
  */
  logout() {
    this.isLogin.next(false);
    this.user.next(null);
    sessionStorage.removeItem("isLogin");
    sessionStorage.removeItem("EmployeeDetail");
    sessionStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  // Xác định thông tin của tài khoản. lăng nghe sự thay đổi
  user = new BehaviorSubject<UserResponse>(sessionStorage.getItem('token') ? this.getUserAndRole() :null);
  currentUser = this.user.asObservable();
  
  /*
    Cập nhật thông tin user
  */
  updateUser(userReponse : UserResponse) {
    this.user.next(userReponse);
  }

  /*
    Lấy thông tin User và Role từ Token
  */ 
  getUserAndRole() {
    // Lấy token
    let token = sessionStorage.getItem('token');

    // Giải mã chuỗi token
    let decoded = jwt_decode(token);

    let userReponse: UserResponse = decoded.employee;

    if(userReponse == null) {
      return null;
    }

    return userReponse;
  }

  // Lăng nghe cập nhập danh sách menu
  menus = new BehaviorSubject<Menu[]>(sessionStorage.getItem('token') ? this.getMenus() : [])
  currenMenus = this.menus.asObservable();

  /*
    Cập nhật thông tin menu
  */
  updateMenus(menus : Menu[]) {
    this.menus.next(menus);
  }


  // Cập nhật danh sách menus từ token 
  getMenus() {
    // Lấy token
    let token = sessionStorage.getItem('token');

    // Giải mã chuỗi token
    let decoded = jwt_decode(token);

    // Lấy danh sách màn hình
    let screen  = decoded.employee.role.screen;
    let menus = this.getScreen(screen);
    return menus;
  }

    /*
    Lấy screen cho hệ thống
    Cấu trúc chuỗi là 1 loạt json ngăn cách nhau bằng dấu '&&&'
    ví dụ: {json1}&&&{json2}
    json1: 
     - title : Tên hiển thị
     - url : đường dẫn hành động
     - icon : icon hiển thị
     - child: menu con => giống menu cha gồm 4 trường tương ứng. Cấu trúc child [{menu-c-1}, {menu-c-2}]
  */ 
  getScreen(screen : string) {
    let menus = [];
    let arrRole = screen.split("&&&");
    for (let index = 0; index < arrRole.length; index++) {
      const element = arrRole[index];

      // Lấy chức năng của tài khoản
      let menu: Menu = new Menu();
      menu = JSON.parse(element);

      // Thêm chức năng vào danh sách
      menus.push(menu);

    }
    return menus;
  }
}

