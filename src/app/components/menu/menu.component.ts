import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ActionService } from 'src/app/services/action.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() isShowMenu : boolean;

  menus = [];
  constructor(
    private authService : AuthService,
    private translate : TranslateService,
    private actionService : ActionService
  ) { 
    translate.setDefaultLang('vi');
  }

  ngOnInit(): void {
    this.authService.currenMenus.subscribe(
      (menus) => this.menus = menus
    )
  }

  // Fuction show hoặc ẩn menu => call actionService để cập nhật
  showHideMenu() {
    this.isShowMenu = !this.isShowMenu;
    this.actionService.updateShowMenu(this.isShowMenu);
  }

}
