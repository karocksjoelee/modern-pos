import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MemberMgtComponent } from './member-mgt.component';


const routes: Routes = [
  { path: '', component: MemberMgtComponent },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MemberMgtComponent]
})
export class MemberMgtModule { }


