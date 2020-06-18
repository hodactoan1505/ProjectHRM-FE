import { ActionToken } from './../../config/action-token';
import { Router } from '@angular/router';
import { HttpReponse } from './../../models/response/http-reponse';
import { UserRequest } from './../../models/request/user-request';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Output } from '@angular/core';
import { Exception } from 'src/app/config/exception';
import { MessageException } from 'src/app/config/message-exception';
import { Constants } from 'src/app/config/constants';
import * as jwt_decode from 'jwt-decode';
import { ActionService } from 'src/app/services/action.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userRequest : UserRequest = new UserRequest();
  message : string;
  
  constructor(
    private authService : AuthService,
    private router : Router,
    private actionServive : ActionService
  ) { }

  ngOnInit(): void {
  }

  /*
    Hành động login vào hệ thống. Nếu thất bại thì báo lỗi
    Ngược lại, nếu thành công thì lưu token và trạng thái loggin vào session
    Cập nhật thông tin tài khoản vào Service để lắng nghe.
  */
  login() {
    this.actionServive.updateLoading(true);
    this.authService.login(this.userRequest).subscribe(
      (data : HttpReponse) => {
        /*
          Kiểm tra lỗi trả về nếu login thất bại
        */ 
        if(data.code == Exception.loginFail) {
          if(data.message === Constants.badCredentials) {
            this.message = MessageException.messageLoginFail;
            return;
          }
        }

        /*
          Xử lý khi login thành công
          Set trạng thái đã login và lưu vào session
          lưu token vào session
          chuyển trang đến dashboard
        */ 
        if(data.code == Exception.success) {
          this.authService.logged(true);

          // Hành động lưu session thông quá class ActionToken
          ActionToken.saveLogged();
          ActionToken.saveToken(data.data);
          
          // Giải mã chuỗi token
          let decoded = jwt_decode(data.data);
          this.authService.updateUser(decoded.userReponse);


          // Lấy danh sách màn hình từ token và đưa vào service lắng nghe
          let menus = this.authService.getScreen(decoded.userReponse.role.screen);
          this.authService.updateMenus(menus);
          
          // Chuyển trang
          this.router.navigate(['dashboard']);
          
          this.actionServive.updateLoading(false);
        }


      },
      (error) => {
        this.message = error.status;
      }
    );
  }
}
