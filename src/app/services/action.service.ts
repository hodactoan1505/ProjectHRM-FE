import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor() { }

  /*
    Lắng nghe cập nhật trạng thái Loading khi có hành động
    Nếu loading bằng false thì ẩn
    Ngược lại sẽ hiển thị loading
  */ 
  loading = new BehaviorSubject<boolean>(false);
  currentLoading = this.loading.asObservable();

  // Cập nhật trạng thái loading
  updateLoading(value : boolean) {
    this.loading.next(value);
  }


  /**/
  showMenu = new BehaviorSubject<boolean>(false);
  currentShowMenu = this.showMenu.asObservable();

  // Cập nhập trạng thái menu
  updateShowMenu(value : boolean) {
    this.showMenu.next(value);
  }


}
