import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';
import { OnsiteOrderComponent } from './onsite-order.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { PreorderService } from '../pre-order/preorder.service';
import { MemberMgtService } from '../member-mgt/member-mgt.service';
import { ItemMgtService } from '../item-mgt/item-mgt.service';


const routes: Routes = [
  { path: '', component: OnsiteOrderComponent },
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [OnsiteOrderComponent],
  providers: [
    PreorderService,
    MemberMgtService,
    ItemMgtService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class OnsiteOrderModule { }


