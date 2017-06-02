import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PreOrderComponent } from './pre-order.component';


const routes: Routes = [
  { path: '', component: PreOrderComponent },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PreOrderComponent]
})
export class PreOrderModule { }


