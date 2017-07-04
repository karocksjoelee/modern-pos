import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-mgt',
  templateUrl: './member-mgt.component.html',
  styleUrls: ['./member-mgt.component.css']
})
export class MemberMgtComponent implements OnInit {

  ngDropdown;
  ngMemberTab = true;
  ngBuildingTab = false;
  ngDropdownTab = false;

  constructor(private _eref: ElementRef, private route: ActivatedRoute) { }

  @HostListener('document:click', ['$event']) onClick(event) {
    if (event.clientX > 270 || event.clientX < 210 || event.clientY > 205) {
      this.hideNgDropdown();
    }
  }

  ngOnInit() {

  }

  memberTabToggle() {

    if (this.ngBuildingTab === true) {
      this.ngBuildingTab = false;
    }
    if (this.ngDropdownTab === true) {
      this.ngDropdownTab = false;
    }

    this.ngMemberTab = !this.ngMemberTab;

  }

  buildingTabToggle() {

    if (this.ngMemberTab === true) {
      this.ngMemberTab = false;
    }
    if (this.ngDropdownTab === true) {
      this.ngDropdownTab = false;
    }

    this.ngBuildingTab = !this.ngBuildingTab;

  }

  showNgDropdown(event: any) {

    if (this.ngMemberTab === true) {
      this.ngMemberTab = false;
    }
    if (this.ngBuildingTab === true) {
      this.ngBuildingTab = false;
    }

    this.ngDropdownTab = true;
    this.ngDropdown = true;

  }

  hideNgDropdown() {
    this.ngDropdown = false;
  }

  onCreateMember() {
    this.hideNgDropdown();
  }

  onCreateBuilding() {
    this.hideNgDropdown();
  }

}
