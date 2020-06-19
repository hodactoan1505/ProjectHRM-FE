import { DepartmentRequest } from './department-request';
import { ProjectRequest } from './project-request';

export class EmployeeRequest {
    public id : number;
    public name : string;
    public department : DepartmentRequest;
    public project : ProjectRequest;
}
