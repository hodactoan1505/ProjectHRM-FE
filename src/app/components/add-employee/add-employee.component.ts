import { TranslateService } from '@ngx-translate/core';
import { MessageException } from 'src/app/config/message-exception';
import { error } from 'protractor';
import { Router } from '@angular/router';
import { Constants } from './../../config/constants';
import { ProjectRequest } from 'src/app/models/request/project-request';
import { DepartmentResponse } from 'src/app/models/response/department-response';
import { EmployeeRequest } from 'src/app/models/request/employee-request';
import { HttpReponse } from './../../models/response/http-reponse';
import { EmployeeService } from 'src/app/services/employee.service';
import { Component, OnInit } from '@angular/core';
import { SkillResponse } from 'src/app/models/response/skill-response';
import { Exception } from 'src/app/config/exception';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DepartmentRequest } from 'src/app/models/request/department-request';
import { AuthService } from 'src/app/services/auth.service';
import { ActionService } from 'src/app/services/action.service';
import { isBuffer } from 'util';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  // Setting cho các dropdownBox của toàn bộ trang
  SettingsMultiple:IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
  };

  SettingsSingle:IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
  };
  
  constructor(
    private employeeService : EmployeeService,
    private authService : AuthService,
    private router : Router,
    private actionService : ActionService,
    private translate : TranslateService
  ) { 
    this.translate.setDefaultLang('vi');
  }

  ngOnInit(): void {
    this.setRole();
    this.getSkill();
  }
  
  /*
    Kiểm trả quyền truy cập!!
    Nếu không phải admin thì chuyển về trang lỗi
    Nếu là Amin thì gửi lên employeeRole để định danh
  */
  employeeRole : EmployeeRequest = new EmployeeRequest();
  setRole() {
    this.authService.currentUser.subscribe(
      (user) => {
        if(user.role.id != Constants.getRoleAdminId) {
          this.router.navigate(['error']);
          return;
        }
        this.getDepartment();
        this.getProject();
      }
    )
  }

  /*
    Lấy danh sách skill
  */
  experiences = [];
  skills : SkillResponse[] = [];
  getSkill() {
    this.employeeService.getSkill().subscribe(
      (data: HttpReponse) => {
        if(data.code == Exception.success) {
          this.skills = data.data;
          this.experiences = Constants.getExperiences();
        }
      }
    )
  }

    /*
    Lấy danh sách phòng ban
  */
  departments : DepartmentRequest[] = [];
  getDepartment() {
    this.employeeService.getDepartment(this.employeeRole).subscribe(
      (data: HttpReponse) => {
        if(data.code == Exception.success) {
          this.departments = data.data;
        }
      }
    )
  }

  /*
    Lấy danh sách dự án
  */
  projects : ProjectRequest[] = [];
  getProject() {
    this.employeeService.getProject(this.employeeRole).subscribe(
      (data: HttpReponse) => {
        if(data.code == Exception.success) {
          this.projects = data.data;
        }
      }
    )
  }


  /*
    Gửi request lên thêm mới hồ sơ nhân viên
  */
  employeeRequest : EmployeeRequest = new EmployeeRequest;
  create() {
    // // Validate
    if(this.isValidate()) {
      return;
    }
    this.employeeService.addEmployee(this.employeeRequest).subscribe(
      (data : HttpReponse) => {
        if(data.code == Exception.success) {
          this.router.navigate(['employee']);
        }
      },
      (error) => {
        this.actionService.updateMessage(error);
        this.router.navigate(['error']);
      }
    );

  }

  nameValidate : boolean = false;
  skillValidate : boolean = false;
  departmentValidate : boolean = false;
  projectValidate : boolean = false;
  isValidate() {
    // Kiểm tra họ tên nhân viên
    if(this.employeeRequest.name == null) {
      this.actionService.updateMessage(MessageException.messageEmployeeNameNotEmpty);
      this.nameValidate = true;
      return true;
    }

    this.nameValidate = false;

    // Kiểm tra danh sách kĩ năng
    if(this.employeeRequest.skills == null) {
      this.actionService.updateMessage(MessageException.messageEmployeeSkillEmpty);
      this.skillValidate = true;
      return true;
    }

    this.skillValidate = false;

    // Kiểm tra phòng ban
    if(this.employeeRequest.department == null) {
      this.actionService.updateMessage(MessageException.messageEmployeeDepartmentEmpty);
      this.departmentValidate  = true;
      return true;
    }

    this.departmentValidate = false;

    // Kiểm tra dự án    
    if(this.employeeRequest.project == null) {
      this.actionService.updateMessage(MessageException.messageEmployeeProjectEmpty);
      this.projectValidate = true;
      return true;
    }

    this.projectValidate = false;

    return false;
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
    this.employeeRequest.avatar = "data:image/jpeg;base64," + btoa(binaryString);
  }


  /*
    Khi chọn tên bộ phận thì sẽ cập nhật lại danh sách dự án
    Chỉ lấy những dự án trong bộ phận  
  */
  onItemDepartmentSelect(item : any) {
    this.employeeRequest.department = [item];
    this.employeeService.getProject(this.employeeRequest).subscribe(
      (data :HttpReponse) => this.projects = data.data
    )
  }
}
