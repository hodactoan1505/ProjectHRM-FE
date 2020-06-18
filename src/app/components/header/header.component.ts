import { UserResponse } from './../../models/response/user-response';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ActionService } from 'src/app/services/action.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user : UserResponse = new UserResponse;

  constructor(
    private authService : AuthService,
    private translate : TranslateService,
    private actionService : ActionService
  ) { 
    this.translate.setDefaultLang('vi');
  }

  ngOnInit(): void {
    this.getInforUser();
  }

  // Lấy thông tài tài khoản
  getInforUser() {
    this.authService.currentUser.subscribe(
      (user) => this.user = user
    )
  }

  // Function logout => call authService để logout
  logout() {
    this.authService.logout();
  }

  // Lắng nghe trạng thái menu
  isShowMenu = false;
  showMenuListerning() {
    this.actionService.currentShowMenu.subscribe(
      (isShowMenu : boolean) => this.isShowMenu = isShowMenu
    )
  }

  // Fuction show hoặc ẩn menu => call actionService để cập nhật
  showHideMenu() {
    this.isShowMenu = !this.isShowMenu;
    this.actionService.updateShowMenu(this.isShowMenu);
  }

}
