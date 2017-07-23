import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

import { PreOrderComponent } from './pre-order.component';
import { PreOrderDetailComponent } from './pre-order-detail/pre-order-detail.component';
import { PreOrderCreateComponent } from './pre-order-create/pre-order-create.component';

import { PreorderService } from './preorder.service';
import { MemberMgtService } from '../member-mgt/member-mgt.service';
import { ItemMgtService } from '../item-mgt/item-mgt.service';
import { PreorderListComponent } from './preorder-list/preorder-list.component';
import { OnsiteListComponent } from './onsite-list/onsite-list.component';
import { OnsiteDetailComponent } from './onsite-detail/onsite-detail.component';


const routes: Routes = [
  { path: '', component: PreOrderComponent, children: [
    { path: '', redirectTo: 'preorders', pathMatch: 'full'},
    { path: 'preorders', component: PreorderListComponent },
    { path: 'preordering', component: PreOrderCreateComponent },
    { path: 'preorders/:id', component: PreOrderDetailComponent },
    { path: 'onsites', component: OnsiteListComponent },
    { path: 'onsites/:id', component: OnsiteDetailComponent }
  ]}
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMyDatePickerModule,
    ModalModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [
    PreOrderComponent,
    PreOrderDetailComponent,
    PreOrderCreateComponent,
    PreorderListComponent,
    OnsiteListComponent,
    OnsiteDetailComponent
  ],
  providers: [
    PreorderService,
    MemberMgtService,
    ItemMgtService
  ]
})
export class PreOrderModule { }


