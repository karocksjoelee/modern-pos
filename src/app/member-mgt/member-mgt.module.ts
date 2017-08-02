import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { MemberMgtComponent } from './member-mgt.component';
import { MemberListComponent } from './member-list/member-list.component';
import { BuildingListComponent } from './building-list/building-list.component';
import { MemberCreateComponent } from './member-create/member-create.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { BuildingCreateComponent } from './building-create/building-create.component';
import { BuildingDetailComponent } from './building-detail/building-detail.component';
import { MemberMgtService } from './member-mgt.service';
import { MemberFilterPipe } from './member-filter.pipe';


const routes: Routes = [
  { path: '', component: MemberMgtComponent, children: [
    { path: '', redirectTo: 'members', pathMatch: 'full'},
    { path: 'members', component: MemberListComponent },
    { path: 'new-member', component: MemberCreateComponent },
    { path: 'members/:id', component: MemberDetailComponent },
    { path: 'buildings', component: BuildingListComponent },
    { path: 'new-building', component: BuildingCreateComponent },
    { path: 'buildings/:id', component: BuildingDetailComponent }
  ]}
];


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [
    MemberMgtComponent,
    MemberListComponent,
    BuildingListComponent,
    MemberCreateComponent,
    MemberDetailComponent,
    BuildingCreateComponent,
    BuildingDetailComponent,
    MemberFilterPipe
    ],
  providers: [MemberMgtService]
})
export class MemberMgtModule { }


