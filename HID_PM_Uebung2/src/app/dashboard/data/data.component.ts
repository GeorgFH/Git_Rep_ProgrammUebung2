import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { CHILDREN_PER_PAGE } from 'src/app/shared/constants';
import { StoreService } from 'src/app/shared/store.service';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator, MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { Child, ChildResponse } from 'src/app/shared/store.service';
import { Kindergarden } from 'src/app/shared/interfaces/Kindergarden';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'], 
  
})
export class DataComponent implements OnInit, AfterViewInit {

  constructor(public storeService: StoreService, public backendService: BackendService) {}

    
  @Input() currentPage!: number;
  @Output() selectPageEvent = new EventEmitter<number>();
  public page: number = 0;
  public childrenPerPage: number = CHILDREN_PER_PAGE;
  dataSource: any;
  
  
  @ViewChild(MatSort) sort!: MatSort;
  

  ngOnInit(): void {
    this.backendService.getChildren(this.currentPage); 

  }

  ngAfterViewInit() {
    
    this.storeService.sort = this.sort;
    /*
    setTimeout(() => {

      this.dataSource = new MatTableDataSource<ChildResponse>(this.storeService.children);  
      this.dataSource.sort = this.sort;

    }, 3000);
    */
  }

  getAge(birthDate: string) {
    var today = new Date();
    var birthDateTimestamp = new Date(birthDate);
    var age = today.getFullYear() - birthDateTimestamp.getFullYear();
    var m = today.getMonth() - birthDateTimestamp.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateTimestamp.getDate())) {
        age--;
    }
    return age;
  }

  /*
  selectPage(i: any) {
    let currentPage = i;
    this.selectPageEvent.emit(currentPage)
    this.backendService.getChildren(currentPage);
  }
  */
  
  public returnAllPages() {
    let res = [];
    const pageCount = Math.ceil(this.storeService.childrenTotalCount / CHILDREN_PER_PAGE);
    for (let i = 0; i < pageCount; i++) {
      res.push(i + 1);
    }
    return res;
  }

  public returnAllChildren() {
    return Math.ceil(this.storeService.childrenTotalCount)
  }

  public cancelRegistration(childId: string) {
    this.backendService.deleteChildData(childId, this.currentPage);
  }

  pageChanged(event: PageEvent) {
    let currentPage = event.pageIndex + 1;
    this.selectPageEvent.emit(currentPage);
    this.backendService.getChildren(currentPage);
  }

  
  public selectedKindergarten: string | null = null;

  public setSelectedKindergarten(kindergarten: string | null): void {
    this.selectedKindergarten = kindergarten;
    this.filterChildren();
  }
  
  public filterChildren(): void {
    if (this.selectedKindergarten) {
      this.storeService.childrenSort = this.storeService.children.filter(child => child.kindergarden.name === this.selectedKindergarten);
    } else {
      this.backendService.getChildren(this.currentPage);
    }
  }

  public getUniqueKindergartens(): string[] {
    return [...new Set(this.storeService.children.map(child => child.kindergarden.name))];
  }
}
  


