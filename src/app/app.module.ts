import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { RealTimeService } from './realtime.service';
import { LoginComponent } from './login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: '', loadChildren: './operation-info/operation-info.module#OperationInfoModule' },
    { path: 'items', loadChildren: './item-mgt/item-mgt.module#ItemMgtModule' },
    { path: 'members', loadChildren: './member-mgt/member-mgt.module#MemberMgtModule' },
    { path: 'preorder', loadChildren: './pre-order/pre-order.module#PreOrderModule' },
    { path: 'onsite', loadChildren: './onsite-order/onsite-order.module#OnsiteOrderModule' },
    { path: 'accounting', loadChildren: './accounting/accounting.module#AccountingModule' },
    { path: 'sales', loadChildren: './sales-analysis/sales-analysis.module#SalesAnalysisModule' },
    { path: 'finance', loadChildren: './finance-analysis/finance-analysis.module#FinanceAnalysisModule' }
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [RealTimeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
