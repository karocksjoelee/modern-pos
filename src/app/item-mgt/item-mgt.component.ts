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
    this.ngItemTab = !this.ngItemTab;
  }

  mealSetTabToggle() {
    this.ngMealSetTab = !this.ngMealSetTab;

  }

  showNgDropdown(event: any) {
    this.ngDropdownTab = true;
    this.ngDropdown = true;
    this.ngItemTab = false;
    this.ngMealSetTab = false;
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
