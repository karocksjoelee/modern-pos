import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AccountingComponent } from './accounting.component';
import { AccountingListComponent } from './accounting-list/accounting-list.component';
import { AccountingDetailComponent } from './accounting-detail/accounting-detail.component';
import { AccountingCreateComponent } from './accounting-create/accounting-create.component';
import { AccountSubjectListComponent } from './account-subject-list/account-subject-list.component';
import { AccountSubjectDetailComponent } from './account-subject-detail/account-subject-detail.component';
import { AccountSubjectCreateComponent } from './account-subject-create/account-subject-create.component';
import { AccountingService } from './accounting.service';


const routes: Routes = [
  { path: '', component: AccountingComponent, children: [
    { path: '', redirectTo: 'accountings', pathMatch: 'full'},
    { path: 'accountings', component: AccountingListComponent },
    { path: 'new-accounting', component: AccountingCreateComponent },
    { path: 'accountings/:id', component: AccountingDetailComponent },
    { path: 'subjects', component: AccountSubjectListComponent },
    { path: 'new-subject', component: AccountSubjectCreateComponent },
    { path: 'subjects/:id', component: AccountSubjectDetailComponent }
  ]}
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [
    AccountingComponent,
    AccountingListComponent,
    AccountingDetailComponent,
    AccountingCreateComponent,
    AccountSubjectListComponent,
    AccountSubjectDetailComponent,
    AccountSubjectCreateComponent
  ],
  providers: [AccountingService]
})
export class AccountingModule { }


