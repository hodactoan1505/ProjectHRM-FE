/*
    Các biến không thay đổi sử dụng trong toàn project
*/
export class Constants {
    // Địa chỉ IP của Server
    public static get baseURL(): string { return "http://192.168.4.163:8080"; }

    // Tiền tố để hiển thị hình ảnh dạng base64
    public static get base64() : string { return "data:image/jpeg;base64,"; }

    // Ngoại lệ này thông báo khi login => (username hoặc password chưa chính xác)
    public static get badCredentials(): string { return "Bad credentials"; }


    /*
        Phân quyền tài khoản => các biến id và name của role
    */
    // Admin
    public static get getRoleAdminName() : string { return "admin"; }
    public static get getRoleAdminId() : number { return 1; }

    // Manager
    public static get getRoleManagerName() : string { return "manager"; }
    public static get getRoleManagerId() : number { return 2; }
    
    // Department
    public static get getRoleDepartmentName() : string { return "department"; }
    public static get getRoleDepartmentId() : number { return 3; }
    
    // Leader
    public static get getRoleLeaderName() : string { return "leader"; }
    public static get getRoleLeaderId() : number { return 4; }
    
    // Member
    public static get getRoleMemberName() : string { return "member"; }
    public static get getRoleMemberId() : number { return 5; }
}   
