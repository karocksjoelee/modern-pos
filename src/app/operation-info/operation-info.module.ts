import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl,FormGroup } from '@angular/forms';
import { OperationInfoComponent } from './operation-info.component';

import { ButtonsModule } from 'ngx-bootstrap/buttons';


const routes: Routes = [
  { path: '', component: OperationInfoComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ButtonsModule.forRoot()
  ],
  declarations: [OperationInfoComponent]
})
export class OperationInfoModule { }


