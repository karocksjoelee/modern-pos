import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemMgtComponent } from './item-mgt.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { MealsetCreateComponent } from './mealset-create/mealset-create.component';
import { MealsetDetailComponent } from './mealset-detail/mealset-detail.component';
import { ItemMgtService } from './item-mgt.service';
import { AccountingService } from '../accounting/accounting.service';
import { ItemListComponent } from './item-list/item-list.component';
import { MealsetListComponent } from './mealset-list/mealset-list.component';



const routes: Routes = [
  { path: '', component: ItemMgtComponent, children: [
    { path: '', redirectTo: 'items', pathMatch: 'full'},
    { path: 'items', component: ItemListComponent },
    { path: 'new-item', component: ItemCreateComponent },
    { path: 'items/:id', component: ItemDetailComponent },
    { path: 'mealsets', component: MealsetListComponent },
    { path: 'new-meal', component: MealsetCreateComponent },
    { path: 'mealsets/:id', component: MealsetDetailComponent }
  ]}
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [
    ItemMgtComponent,
    ItemCreateComponent,
    ItemDetailComponent,
    MealsetCreateComponent,
    MealsetDetailComponent,
    ItemListComponent,
    MealsetListComponent
    ],
  providers: [ItemMgtService, AccountingService]
})
export class ItemMgtModule { }


