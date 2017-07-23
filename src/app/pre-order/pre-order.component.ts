import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PreorderService } from './preorder.service';

@Component({
  selector: 'app-pre-order',
  templateUrl: './pre-order.component.html',
  styleUrls: ['./pre-order.component.css']
})
export class PreOrderComponent implements OnInit {

  ngPreorderTab = true;
  ngOnsiteTab = false;
  ngPreorderingTab = false;
  preorders;

  constructor(private _preorderService: PreorderService, private route: ActivatedRoute) { }

  ngOnInit() {

  }

  preorderTabToggle() {
    if (this.ngOnsiteTab === true || this.ngPreorderingTab === true) {
      this.ngOnsiteTab = false;
      this.ngPreorderingTab = false;
    }

    this.ngPreorderTab = !this.ngPreorderTab;
  }

  onsiteTabToggle() {
    if (this.ngPreorderTab === true || this.ngPreorderingTab === true) {
      this.ngPreorderTab = false;
      this.ngPreorderingTab = false;
    }

    this.ngOnsiteTab = !this.ngOnsiteTab;
  }

  prorderingTabToggle() {
    if (this.ngPreorderTab === true || this.ngOnsiteTab === true) {
      this.ngPreorderTab = false;
      this.ngOnsiteTab = false;
    }

    this.ngPreorderingTab = !this.ngPreorderingTab;
  }

}
