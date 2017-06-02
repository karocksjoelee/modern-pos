import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FinanceAnalysisComponent } from './finance-analysis.component';


const routes: Routes = [
  { path: '', component: FinanceAnalysisComponent },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FinanceAnalysisComponent]
})
export class FinanceAnalysisModule { }


