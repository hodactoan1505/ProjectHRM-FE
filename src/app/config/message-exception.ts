export class MessageException {
    // Thông báo khi nhập username password sai
    public static get messageLoginFail() : string { return "Username && password not exactly"; }

    // Thông báo khi chưa nhập tên Nhân viên khi tạo mới
    public static get messageEmployeeNameNotEmpty() : string { return "Name not empty"; }
   
    // Thông báo khi chưa danh sách kĩ năng đang rỗng
    public static get messageEmployeeSkillEmpty() : string { return "error.messageEmployeeSkillEmpty"; }

    // Thông báo khi chưa chọn bộ phận
    public static get messageEmployeeDepartmentEmpty() : string { return "error.messageEmployeeDepartmentEmpty"; }

    // Thông báo khi chưa chọn dự án
    public static get messageEmployeeProjectEmpty() : string { return "error.messageEmployeeProjectEmpty"; }

    // Thông báo khi chưa điền trường name
    public static get messageNameEmpty() : string { return "error.message.nameEmpty"; }

    // Thông báo khi chưa điền trường ngày bắt đầu
    public static get messageStartDateEmpty() : string { return "error.message.startDateEmpty"; }

    // Thông báo khi trường tên đã tồn tại
    public static get messageNameAlreadyExist() : string { return "error.message.duplicateName"; }
} 
