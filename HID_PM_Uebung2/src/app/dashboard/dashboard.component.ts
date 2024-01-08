import { Component } from '@angular/core';
import { StoreService } from 'src/app/shared/store.service';
import { BackendService } from 'src/app/shared/backend.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  
  constructor(public storeService: StoreService, public backendService: BackendService) {}
  
  public currentPage: number = 1;
  public showAddData = true;

  receiveMessage(newPageCount: number) {
    this.currentPage = newPageCount;
  }

  toggleButtonClicked(showAddData: boolean) {
    this.showAddData = showAddData;
  }
  
}
