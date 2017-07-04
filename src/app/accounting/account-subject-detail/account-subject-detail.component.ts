import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountingService } from '../accounting.service';

@Component({
  selector: 'app-account-subject-detail',
  templateUrl: './account-subject-detail.component.html',
  styleUrls: ['./account-subject-detail.component.css']
})
export class AccountSubjectDetailComponent implements OnInit {

  private id: string;
  public accountSubject: any;
  updateForm: FormGroup;

  constructor(private _accountingService: AccountingService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];

    this._accountingService.getAccountSubject(this.id).subscribe((accountSubject) => {

      this.accountSubject = accountSubject[0];
      this.updateForm = new FormGroup({
        'subjectName': new FormControl(this.accountSubject.subjectName),
        'subjectEng': new FormControl(this.accountSubject.subjectEng),
        'subjectType': new FormControl(this.accountSubject.subjectType),
        'barcode': new FormControl(this.accountSubject.barcode),
        'unit': new FormControl(this.accountSubject.unit),
        'main': new FormControl(this.accountSubject.main),
        'description': new FormControl(this.accountSubject.description)
      });

    });
  }

  updateSubject() {

    console.log(this.updateForm.value);
    this._accountingService.updateSubject(this.id, this.updateForm.value).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        alert(error);
      },
      () => {
        console.log('Completed');
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    );

  }

}
