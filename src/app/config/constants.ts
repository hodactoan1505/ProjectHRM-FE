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

}
