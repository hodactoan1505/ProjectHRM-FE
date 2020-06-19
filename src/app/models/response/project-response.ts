import { DepartmentResponse } from './department-response';

export class ProjectResponse {
    public id : number;
    public name : string;
    public department : DepartmentResponse;
}
