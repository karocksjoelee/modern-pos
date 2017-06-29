import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AccountingService } from '../accounting.service';
import * as moment from 'moment';

@Component({
  selector: 'app-accounting-create',
  templateUrl: './accounting-create.component.html',
  styleUrls: ['./accounting-create.component.css']
})
export class AccountingCreateComponent implements OnInit {

  ngModal;
  accountSubjects;
  selectedSubject;
  createForm: FormGroup;

  constructor(private _accountingService: AccountingService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit() {

    this._accountingService.getAccountSubjects().subscribe((subjects) => {
      this.accountSubjects = subjects;
    });

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

    this.createForm.value.date = moment().format();
    this.createForm.value.accountSubject = this.selectedSubject._id;
    console.log(this.createForm.value);
    this._accountingService.newAccounting(this.createForm.value).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        alert(error);
      },
      () => {
        alert('Completed');
        this.router.navigate(['../accountings'], { relativeTo: this.route });
      });

  }

  selectingSubject() {
    this.ngModal = true;
  }

  subjectSelected(inputSubject) {

    console.log('Selected ', inputSubject._id);

    this.createForm.value.accountSubject = inputSubject._id;
    this.createForm.value.unit = inputSubject.unit;
    this.selectedSubject = inputSubject;

  }

  closeModal() {
    this.ngModal = false;
  }

}
