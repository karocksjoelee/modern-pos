import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AccountingComponent } from './accounting.component';


const routes: Routes = [
  { path: '', component: AccountingComponent },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AccountingComponent]
})
export class AccountingModule { }


