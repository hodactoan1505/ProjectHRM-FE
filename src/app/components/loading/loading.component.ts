import { Component, OnInit } from '@angular/core';
import { ActionService } from 'src/app/services/action.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(
    private actionService : ActionService  
  ) { }

  ngOnInit(): void {
    this.loading();
  }

  isLoading = false;
  loading() {
    this.actionService.currentLoading.subscribe(
      (loading) => this.isLoading = loading
    )
  }
}
