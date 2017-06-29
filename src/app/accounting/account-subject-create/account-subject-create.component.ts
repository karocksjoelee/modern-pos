import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountingService } from '../accounting.service';

@Component({
  selector: 'app-account-subject-create',
  templateUrl: './account-subject-create.component.html',
  styleUrls: ['./account-subject-create.component.css']
})
export class AccountSubjectCreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private _accountingService: AccountingService, private router: Router, private route: ActivatedRoute ) { }

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
    this._accountingService.createSubject(this.createForm.value).subscribe(
      (response) => {
      console.log('Response :',response);
      },
      (error) => {
      alert(error);
      },
      () => {
      console.log('Completed');
      this.router.navigate(['../'], { relativeTo: this.route });
    });

  }

}
