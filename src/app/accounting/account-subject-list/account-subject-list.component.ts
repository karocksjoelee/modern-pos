import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountingService } from '../accounting.service';

@Component({
  selector: 'app-account-subject-list',
  templateUrl: './account-subject-list.component.html',
  styleUrls: ['./account-subject-list.component.css']
})
export class AccountSubjectListComponent implements OnInit {

  accountSubjects;

  constructor(private _accountingService: AccountingService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this._accountingService.getAccountSubjects().subscribe((accountSubjects) => {
      this.accountSubjects = accountSubjects;
      console.log(this.accountSubjects);
    });

  }

}