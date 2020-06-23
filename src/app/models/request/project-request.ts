import { DepartmentRequest } from './department-request';

export class ProjectRequest {
    public id : number;
    public name : string;
    public department : DepartmentRequest;
    public persion : number;
    public description : string;
    public startdate : string;
    public enddate : string;
}
