import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AccountingService } from '../accounting.service';

@Component({
  selector: 'app-accounting-create',
  templateUrl: './accounting-create.component.html',
  styleUrls: ['./accounting-create.component.css']
})
export class AccountingCreateComponent implements OnInit {

  modal;
  selectedSubject;
  createForm: FormGroup;

  @ViewChild('staticModal') staticModal;

  constructor(private _accountingService: AccountingService) { }

  ngOnInit() {

    this.createForm = new FormGroup({
      'date': new FormControl(''),
      'accountSubject': new FormControl(''),
      'unit': new FormControl(''),
      'amount': new FormControl(''),
      'quantity': new FormControl(''),
      'notes': new FormControl('')
    });

  }

  newAccounting() {

    console.log(this.createForm.value);

  }

  subjectSelected(inputSubject) {

    this.createForm.value.accountSubject = inputSubject._id;
    this.createForm.value.unit = inputSubject.unit;
    this.selectedSubject = inputSubject.subjectName;
    this.staticModal.hide();

  }

}
