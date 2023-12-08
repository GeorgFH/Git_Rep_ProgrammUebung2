import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';

declare var bootstrap: any;


@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})


export class AddDataComponent implements OnInit{
  
  constructor(private formbuilder: FormBuilder, public storeService: StoreService, public backendService: BackendService) {
  }

  showAlert: boolean = false;

  public addChildForm: any;
  @Input() currentPage!: number;
  
  ngOnInit(): void {

    this.addChildForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      kindergardenId: ['', Validators.required],
      birthDate: [null, Validators.required]
    })

  }
  
  onSubmit() {
    if(this.addChildForm.valid) {
      console.log(this.currentPage);
      this.backendService.addChildData(this.addChildForm.value, this.currentPage);
      this.showToast();
    } else {
      this.toggleAlert();
    }
  }

  toggleAlert() {
    this.showAlert = !this.showAlert;
  }

  showToast() {
    const toastElement = new bootstrap.Toast(document.getElementById('myToast'));
    toastElement.show();
 }

  hideAlert() {
    this.showAlert = false;
  }
}