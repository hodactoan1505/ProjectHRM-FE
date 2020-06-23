import { DepartmentResponse } from './department-response';

export class ProjectResponse {
    public id : number;
    public name : string;
    public department : DepartmentResponse;
    public persion : number;
    public description : string;
    public startdate : string;
    public enddate : string;
}
