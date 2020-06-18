import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './services/employee.service';
import { HttpReponse } from './models/response/http-reponse';
import { Exception } from './config/exception';
import { Menu } from './models/response/menu';
import { TranslateService } from '@ngx-translate/core';
import { ActionService } from './services/action.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Bryen';
  image : string;

  constructor(
    private authService : AuthService,
    private employeeService : EmployeeService,
    private translate : TranslateService,
    private actionService : ActionService) {
      translate.setDefaultLang('vi');
  }
  ngOnInit(): void {
    this.loginToServer();
    this.actionShowMenu();
  }

  showMenu = false;
  actionShowMenu() {
    this.actionService.currentShowMenu.subscribe(
      (isShowMenu : boolean) => this.showMenu = isShowMenu
    )
  }

  /*
    Biến xác định đã login chưa?
    Nếu isLogged = true thì show header
    Else thì header sẽ bị ẩn
  */ 
  islogged : boolean = false;
  loginToServer() {  
    this.authService.currentLogin.subscribe(
      isLogged => {
      this.islogged = isLogged
      }
    )
  }

  // Lấy dữ liệu từ file
  handleFileSelect(event : any) {
    if(event.target.files) {
      //Lấy file đầu tiên
      let file = event.target.files[0];
      let reader = new FileReader();
      // Triển khai handler => set image to src
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }


  _handleReaderLoaded(readerEvt : any) {
    var binaryString = readerEvt.target.result;
    // btoa mã hóa về base64
    this.image = "data:image/jpeg;base64," + btoa(binaryString);
  }






}
