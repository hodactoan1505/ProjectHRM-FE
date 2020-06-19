import { DepartmentResponse } from './department-response';
import { RoleReponse } from './role-reponse';
import { ProjectResponse } from './project-response';
export class UserResponse {
    public username : string;
    public role : RoleReponse;
    public name : string;
    public id : number;
    public department : DepartmentResponse;
    public project : ProjectResponse;
}
