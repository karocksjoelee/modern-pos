import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OperationInfoComponent } from './operation-info.component';


const routes: Routes = [
  { path: '', component: OperationInfoComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OperationInfoComponent]
})
export class OperationInfoModule { }


