import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SalesAnalysisComponent } from './sales-analysis.component';


const routes: Routes = [
  { path: '', component: SalesAnalysisComponent },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SalesAnalysisComponent]
})
export class SalesAnalysisModule { }


