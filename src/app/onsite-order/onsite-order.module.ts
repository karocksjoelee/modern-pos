import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OnsiteOrderComponent } from './onsite-order.component';


const routes: Routes = [
  { path: '', component: OnsiteOrderComponent },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OnsiteOrderComponent]
})
export class OnsiteOrderModule { }


