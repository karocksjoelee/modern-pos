import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { ItemMgtService } from './item-mgt.service';

@Component({
  selector: 'app-item-mgt',
  templateUrl: './item-mgt.component.html',
  styleUrls: ['./item-mgt.component.css']
})
export class ItemMgtComponent implements OnInit {

  ngTabActive;
  ngDropdown;

  constructor(private _eref: ElementRef) { }

  @HostListener('document:click', ['$event']) onClick(event) {
    if (event.clientX > 270 || event.clientX < 210 || event.clientY > 205) {
      this.hideNgDropdown();
    }
  }


  ngOnInit() {

    this.ngDropdown = false;
    this.ngTabActive = 'itemActived';

  } // end of ngOnInit()

  showNgDropdown(event: any) {
    this.ngDropdown = true;
    // console.log(event);
  }

  hideNgDropdown() {
    this.ngDropdown = false;
  }

  onCreateItem() {
    console.log('Item OK');
    this.hideNgDropdown();
  }

  onCreateMealSet() {
    console.log('MealSet OK');
    this.hideNgDropdown();
  }





}
