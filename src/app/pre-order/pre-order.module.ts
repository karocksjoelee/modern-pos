import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { ToastyModule } from 'ng2-toasty';

import { PreOrderComponent } from './pre-order.component';
import { PreOrderCreateComponent } from './pre-order-create/pre-order-create.component';

import { PreorderService } from './preorder.service';
import { MemberMgtService } from '../member-mgt/member-mgt.service';
import { ItemMgtService } from '../item-mgt/item-mgt.service';
import { PreorderListComponent } from './preorder-list/preorder-list.component';
import { OnsiteListComponent } from './onsite-list/onsite-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: PreOrderComponent, children: [
    { path: '', redirectTo: 'preorders', pathMatch: 'full'},
    { path: 'preorders', component: PreorderListComponent },
    { path: 'preordering', component: PreOrderCreateComponent },
    { path: 'onsites', component: OnsiteListComponent },
    { path: ':id', component: OrderDetailComponent }
  ]}
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgxMyDatePickerModule,
    ModalModule.forRoot(),
    ToastyModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [
    PreOrderComponent,
    PreOrderCreateComponent,
    PreorderListComponent,
    OnsiteListComponent,
    OrderDetailComponent
  ],
  providers: [
    PreorderService,
    MemberMgtService,
    ItemMgtService
  ]
})
export class PreOrderModule { }


