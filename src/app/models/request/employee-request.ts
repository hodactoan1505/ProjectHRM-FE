import { SkillRequest } from './skill-request';
import { DepartmentRequest } from './department-request';
import { ProjectRequest } from './project-request';

export class EmployeeRequest {
    public id : number = null;
    public name : string = null;
    public department : DepartmentRequest[] = null;
    public project : ProjectRequest[] = null;
    public skills : SkillRequest[] = null;
    public experience : string = null;
    public address : string = null;
    public birthday : string = null;
    public phone : string = null;
    public gmail : string = null;
    public skype : string = null;
    public queQuan : string = null;
    public avatar : string = null;
    public sex : boolean = false;
    public married : boolean = false;
    public finishTraning : string = null;
    public joinCompany : string = null;
}
