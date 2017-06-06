import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ItemMgtComponent } from './item-mgt.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { MealsetCreateComponent } from './mealset-create/mealset-create.component';
import { MealsetDetailComponent } from './mealset-detail/mealset-detail.component';


const routes: Routes = [
  { path: '', component: ItemMgtComponent },
  { path: 'new-item', component: ItemCreateComponent },
  { path: 'item/:id', component: ItemDetailComponent },
  { path: 'new-meal', component: MealsetCreateComponent },
  { path: 'meal/:id', component: MealsetDetailComponent }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TabsModule.forRoot()
  ],
  declarations: [ItemMgtComponent, ItemCreateComponent, ItemDetailComponent, MealsetCreateComponent, MealsetDetailComponent]
})
export class ItemMgtModule { }


