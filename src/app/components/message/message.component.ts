import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { ActionService } from 'src/app/services/action.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(
    private actionService : ActionService,
    private translate : TranslateService) {
      this.translate.setDefaultLang('vi');
     }

  ngOnInit(): void {
    this.showMessage();
  }

  /* Cập nhật tin nhắn của hệ thống */ 
  message : string;
  showMessage() {
    this.actionService.currentMessage.subscribe(
      (message) => {
        this.message = message;

        setTimeout(() => {
          this.message = null;
        }, 10000);
      }
    )
  }

}
