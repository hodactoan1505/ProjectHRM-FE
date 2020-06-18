
/*
    Trả về các mã code để kiểm tra lỗi
*/
export class Exception {
    // Reponse thành công khi thực hiện 1 hành động. 
    // Return 999
    public static get success() : number { return 999; }

    // Response lỗi khi login thất bại. 
    // Return 100
    public static get loginFail() : number { return 100; }
}
