import { error } from 'protractor';
import { HttpReponse } from './../../models/response/http-reponse';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { ActionService } from 'src/app/services/action.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeRequest } from 'src/app/models/request/employee-request';
import { Exception } from 'src/app/config/exception';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SkillResponse } from 'src/app/models/response/skill-response';
import { Constants } from 'src/app/config/constants';
import { MessageException } from 'src/app/config/message-exception';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // Hình mặc định
  src = "../../../assets/images/avatar.jpg";
  /*
  Danh sách cài đặt của selectbox
*/
  SettingsSingle: IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
  };

  // Dropdown setting cho chọn nhiều giá trị
  SettingsMultiple: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
  };

  constructor(
    private transalte: TranslateService,
    private actionService: ActionService,
    private authService: AuthService,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.transalte.setDefaultLang("vi");
  }

  ngOnInit(): void {
    this.setRole();
    this.getSkill();
  }

  /*
 Lấy danh sách skill
 */
  experiences = [];
  skills: SkillResponse[] = [];
  getSkill() {
    this.employeeService.getSkill().subscribe(
      (data: HttpReponse) => {
        if (data.code == Exception.success) {
          this.skills = data.data;
          this.experiences = Constants.getExperiences();
        }
      }
    )
  }


  request: EmployeeRequest = new EmployeeRequest;
  setRole() {
    this.authService.currentUser.subscribe(
      (user) => {
        if (user != null) {
          this.request.id = user.id;

          this.getData();
        }
      }
    );
  }

  employeeRequest: EmployeeRequest = new EmployeeRequest;
  getData() {
    this.employeeService.getEmployee(this.request).subscribe(
      (data: HttpReponse) => {
        if (data.code == Exception.success) {
          this.employeeRequest = data.data[0];
          console.log(this.employeeRequest)
        }
      },
      (error) => {
        this.actionService.updateMessage(error.status);
        this.router.navigate(['error']);
      }

    )
  }

  exit() {

  }
  nameValidate
  skillValidate;
  update() {
    this.actionService.updateLoading(true);
    if (this.isValidate()) {
      return;
    }

    this.employeeService.updateEmployee(this.employeeRequest).subscribe(
      (data: HttpReponse) => {
        if (data.code == Exception.success) {
          this.actionService.updateLoading(false);
        } else {
          this.actionService.updateMessage(data.message);
          this.actionService.updateLoading(false);
        }
      },
      (error) => {
        this.actionService.updateMessage(error.status);
        this.router.navigate(['error']);
        this.actionService.updateLoading(false);
      }
    )
  }

  isValidate() {
    // Kiểm tra họ tên nhân viên
    if(this.employeeRequest.name == null || this.employeeRequest.name.trim() == "") {
      this.actionService.updateMessage(MessageException.messageEmployeeNameNotEmpty);
      this.nameValidate = true;
      return true;
    }

    this.nameValidate = false;

    // Kiểm tra danh sách kĩ năng
    if(this.employeeRequest.skills == null || this.employeeRequest.skills.length == 0) {
      this.actionService.updateMessage(MessageException.messageEmployeeSkillEmpty);
      this.skillValidate = true;
      return true;
    }

    this.skillValidate = false;


    return false;
  }


  // Lấy dữ liệu từ file
  handleFileSelect(event: any) {
    if (event.target.files) {
      //Lấy file đầu tiên
      let file = event.target.files[0];
      let reader = new FileReader();
      // Triển khai handler => set image to src
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    // btoa mã hóa về base64
    this.employeeRequest.avatar = "data:image/jpeg;base64," + btoa(binaryString);
  }
}
