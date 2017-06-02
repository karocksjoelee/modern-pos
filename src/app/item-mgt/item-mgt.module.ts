import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ItemMgtComponent } from './item-mgt.component';


const routes: Routes = [
  { path: '', component: ItemMgtComponent },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ItemMgtComponent]
})
export class ItemMgtModule { }


