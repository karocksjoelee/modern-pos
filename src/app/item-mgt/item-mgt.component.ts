import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemMgtService } from './item-mgt.service';

@Component({
  selector: 'app-item-mgt',
  templateUrl: './item-mgt.component.html',
  styleUrls: ['./item-mgt.component.css']
})
export class ItemMgtComponent implements OnInit {

  ngTabActive = 'itemActived';
  ngDropdown ;
  ngItemTab = true;
  ngMealSetTab = false;
  ngDropdownTab = false;

  constructor(private _eref: ElementRef, private route: ActivatedRoute) { }

  @HostListener('document:click', ['$event']) onClick(event) {
    if (event.clientX > 270 || event.clientX < 210 || event.clientY > 205) {
      this.hideNgDropdown();
    }
  }


  ngOnInit() {

    this.ngDropdown = false;

  } // end of ngOnInit()

  itemTabToggle() {

    if ( this.ngMealSetTab === true ) {
      this.ngMealSetTab = false;
    }
    if ( this.ngDropdownTab === true ) {
      this.ngDropdownTab = false;
    }

    this.ngItemTab = !this.ngItemTab;

  }

  mealSetTabToggle() {

    if ( this.ngItemTab === true) {
      this.ngItemTab = false;
    }
    if ( this.ngDropdownTab === true ) {
      this.ngDropdownTab = false;
    }

    this.ngMealSetTab = !this.ngMealSetTab;

  }

  showNgDropdown(event: any) {

    if ( this.ngItemTab === true) {
      this.ngItemTab = false;
    }
    if ( this.ngMealSetTab === true ) {
      this.ngMealSetTab = false;
    }

    this.ngDropdownTab = true;
    this.ngDropdown = true;

  }

  hideNgDropdown() {
    this.ngDropdown = false;
  }

  onCreateItem() {
    this.hideNgDropdown();
  }

  onCreateMealSet() {
    this.hideNgDropdown();
  }





}
