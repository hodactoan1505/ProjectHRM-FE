/*
    Class quản lý session Token
*/ 
export class ActionToken {

    /*
        Lấy Token trong session
        return jwt nếu tồn tại
        return null nếu không có
    */
    public static get getToken() {
        let token = sessionStorage.getItem("token");
        if(token != null) {
            return token;
        }

        return null;
    }


    // Lưu token vào session
    public static saveToken(token : string) {
        sessionStorage.setItem("token", token);
    }


    // Lưu trạng thái logged vào session
    public static saveLogged() {
        sessionStorage.setItem("isLogin", "true");
    }
}
