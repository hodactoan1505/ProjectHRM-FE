import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/models/response/user-response';
import { SkillResponse } from 'src/app/models/response/skill-response';
import { HttpReponse } from 'src/app/models/response/http-reponse';
import { Exception } from 'src/app/config/exception';
import { Constants } from 'src/app/config/constants';
import { DepartmentRequest } from 'src/app/models/request/department-request';
import { ProjectRequest } from 'src/app/models/request/project-request';
import { EmployeeService } from 'src/app/services/employee.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionService } from 'src/app/services/action.service';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeRequest } from 'src/app/models/request/employee-request';
import { MessageException } from 'src/app/config/message-exception';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  user : UserResponse = new UserResponse;
  
  /*
    Danh sách cài đặt của selectbox
  */
  SettingsSingle:IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
  };

  // Dropdown setting cho chọn nhiều giá trị
  SettingsMultiple:IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
  };

  id : number;

  constructor(
    private employeeService : EmployeeService,
    private authService : AuthService,
    private router : Router,
    private actionService : ActionService,
    private translate : TranslateService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.translate.setDefaultLang("vi");
    
  }

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
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
        if(user.role.id == Constants.getRoleMemberId && user.id == this.id) {
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

  
  employeeRequest : EmployeeRequest = new EmployeeRequest;
  update() {

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

}
