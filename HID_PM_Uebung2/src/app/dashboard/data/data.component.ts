import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { CHILDREN_PER_PAGE } from 'src/app/shared/constants';
import { StoreService } from 'src/app/shared/store.service';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'], 
  
})
export class DataComponent implements OnInit {

  constructor(public storeService: StoreService, private backendService: BackendService) {}
  
  @Input() currentPage!: number;
  @Output() selectPageEvent = new EventEmitter<number>();
  public page: number = 0;
  public childrenPerPage: number = CHILDREN_PER_PAGE;

  ngOnInit(): void {
    this.backendService.getChildren(this.currentPage);
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

  selectPage(i: any) {
    let currentPage = i;
    this.selectPageEvent.emit(currentPage)
    this.backendService.getChildren(currentPage);
  }
  
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



 /*

  Erster Versuch der Implementierung einer Suchfunktion

  searchText: string = '';
  items: any[] = [
    { name: 'Item 1' },
    { name: 'Item 2' },
  ... weitere Elemente
   ];

   filteredItems(): any[] {
     if (!this.searchText) {
       return this.items;
    }

   const searchTextLowerCase = this.searchText.toLowerCase();

   return this.items.filter(item => {
      // Implementiere erweiterte Filterlogik hier
     const nameMatch = item.name.toLowerCase().includes(searchTextLowerCase);
     const kindergardenMatch = item.kindergarden.name.toLowerCase().includes(searchTextLowerCase);

       // Filtere nach Name oder Kindergarten-Name
       return nameMatch || kindergardenMatch;
     });
   }

  // Neue Variable für gefilterte Daten
   filteredData: any[] = [];

  updateFilteredData() {
   this.filteredData = this.filteredItems();
  }
  */

}


