import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AccountingService } from '../accounting.service';

@Component({
  selector: 'app-account-subject-create',
  templateUrl: './account-subject-create.component.html',
  styleUrls: ['./account-subject-create.component.css']
})
export class AccountSubjectCreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private _accountingService: AccountingService) { }

  ngOnInit() {

    this.createForm = new FormGroup({
      'subjectName': new FormControl(''),
      'subjectEng': new FormControl(''),
      'subjectType': new FormControl(''),
      'barcode': new FormControl(''),
      'unit': new FormControl(''),
      'main': new FormControl(false),
      'description': new FormControl('')
    });
  }

  newSubject() {

    console.log(this.createForm.value);

  }

}
