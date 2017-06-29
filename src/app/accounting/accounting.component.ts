import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css']
})
export class AccountingComponent implements OnInit {

  ngDropdown;
  ngAccountingTab = true;
  ngSubjectTab = false;
  ngDropdownTab = false;

  constructor(private _eref: ElementRef, private route: ActivatedRoute) { }

  @HostListener('document:click', ['$event']) onClick(event) {
    if (event.clientX > 270 || event.clientX < 210 || event.clientY > 205) {
      this.hideNgDropdown();
    }
  }

  ngOnInit() {


  }

  accountingTabToggle() {

    if (this.ngSubjectTab === true) {
      this.ngSubjectTab = false;
    }
    if (this.ngDropdownTab === true) {
      this.ngDropdownTab = false;
    }

    this.ngAccountingTab = !this.ngAccountingTab;

  }

  subjectTabToggle() {

    if (this.ngAccountingTab === true) {
      this.ngAccountingTab = false;
    }
    if (this.ngDropdownTab === true) {
      this.ngDropdownTab = false;
    }

    this.ngSubjectTab = !this.ngSubjectTab;

  }

  showNgDropdown(event: any) {

    if (this.ngAccountingTab === true) {
      this.ngAccountingTab = false;
    }
    if (this.ngSubjectTab === true) {
      this.ngSubjectTab = false;
    }

    this.ngDropdownTab = true;
    this.ngDropdown = true;

  }

  hideNgDropdown() {
    this.ngDropdown = false;
  }

  onCreateAccounting() {
    this.hideNgDropdown();
  }

  onCreateSubject() {
    this.hideNgDropdown();
  }

}
