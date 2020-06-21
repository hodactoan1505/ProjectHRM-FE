import { Constants } from './constants';
import * as jwt_decode from 'jwt-decode';

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

    public static expirationToken() : boolean {
        // debugger
        let token = sessionStorage.getItem("token")
        
        if(token != null) {
            /*
                Giải mã chuỗi token
                Lấy thời gian hiện tại so sánh, nếu hết hạn token thì tự động đăng xuất
            */ 
            let decoded = jwt_decode(token);
            let expiration = decoded.exp;
            let now = new Date().getTime() / 1000;
            if(now < expiration) {
                return true;
            }
            
        }
        return false;
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
