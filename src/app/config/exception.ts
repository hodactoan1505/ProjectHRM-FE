
/*
    Trả về các mã code để kiểm tra lỗi
*/
export class Exception {
    // Reponse thành công khi thực hiện 1 hành động. 
    // Return 999
    public static get success() : number { return 999; }

    // Response lỗi này khi không xác định. 
    // Return 998
    public static get unknown() : number { return 998; }

    // Response lỗi khi login thất bại. 
    // Return 997
    public static get loginFail() : number { return 997; }

    // Response lỗi khi tạo mới phòng ban bị trùng tên
    public static get departmentAlreadyExist() : number { return 142;}

    // Response lỗi khi phòng ban không tồn tại
    public static get departmentNotFound() : number { return 111;}    
}
