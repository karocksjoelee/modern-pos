import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountingService } from '../accounting.service';
import * as moment from 'moment';

@Component({
  selector: 'app-accounting-list',
  templateUrl: './accounting-list.component.html',
  styleUrls: ['./accounting-list.component.css']
})
export class AccountingListComponent implements OnInit {

  accountings;
  currentMoment = new Date();
  thisYear;
  thisMonth;
  fixedMonth;

  constructor(private _accountingService: AccountingService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.thisYear = this.currentMoment.getFullYear();
    this.thisMonth = this.currentMoment.getMonth() + 1;

    if (this.thisMonth.toString().length < 2 ) {
      this.fixedMonth = `0${this.thisMonth}`;
    } else {
      this.fixedMonth = this.thisMonth;
    }

    console.log(`Date  --- ${this.thisYear}${this.fixedMonth}`);

    this._accountingService.getAccountingsByDate(`${this.thisYear}${this.fixedMonth}`).subscribe((accountings) => {
      this.accountings = accountings;
    });

  }

  onChangeDate() {

    console.log(this.thisMonth);

    if (this.thisMonth.toString().length < 2 ) {
      this.fixedMonth = `0${this.thisMonth}`;
    } else {
      this.fixedMonth = this.thisMonth;
    }

    this._accountingService.getAccountingsByDate(`${this.thisYear}${this.fixedMonth}`).subscribe((accountings) => {
      this.accountings = accountings;
    });

  }

}
