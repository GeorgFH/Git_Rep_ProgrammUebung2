import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KindergartenDetailComponent } from './kindergarten-Waldorf/kindergarten-detail.component';
import { KindergartenStadtWien1Component } from './kindergarten-stadt-wien1/kindergarten-stadt-wien1.component';
import { KindergartenStadtWien2Component } from './kindergarten-stadt-wien2/kindergarten-stadt-wien2.component';
import { KigaMontessoriComponent } from './kiga-montessori/kiga-montessori.component';
import { KigaKarlSchubertComponent } from './kiga-karl-schubert/kiga-karl-schubert.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'kindergarten1', component: KindergartenDetailComponent }, 
  { path: 'kindergarten2', component: KindergartenStadtWien1Component },
  { path: 'kindergarten3', component: KindergartenStadtWien2Component }, 
  { path: 'kindergarten4', component: KigaMontessoriComponent },
  { path: 'kindergarten5', component: KigaKarlSchubertComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
