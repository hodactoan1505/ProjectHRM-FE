/*
    Các biến không thay đổi sử dụng trong toàn project
*/
export class Constants {
    // Địa chỉ IP của Server
    public static get baseURL(): string { return "http://localhost:8080"; }

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


    /*
        Danh sách kinh nghiệm bản thân trước khi vào công ty
        - Mới ra trường
        - Kinh nghiệm 1 - 3 năm
        - Kinh nghiệm 3 - 5 năm 
        - Kinh nghiệm 5 - 7 năm
        - Kinh nghiệm 7 - 10 năm
        - Kinh nghiệm trên 10 năm
    */ 
    public static getExperiences() : any {
        let list = [
            { id : "Mới ra trường", name : "Mới ra trường" },
            { id : "Kinh nghiệm 1 - 3 năm", name : "Kinh nghiệm 1 - 3 năm" },
            { id : "Kinh nghiệm 3 - 5 năm", name : "Kinh nghiệm 3 - 5 năm " },
            { id : "Kinh nghiệm 5 - 7 năm", name : "Kinh nghiệm 5 - 7 năm" },
            { id : "Kinh nghiệm 7 - 10 năm", name : "Kinh nghiệm 7 - 10 năm" },
            { id : "Kinh nghiệm trên 10 năm", name : "Kinh nghiệm trên 10 năm" }
        ];
        return list;
    }
}   
