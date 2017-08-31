import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import * as moment from 'moment';
import * as _ from 'lodash';


import { PreorderService } from '../pre-order/preorder.service';
import { MemberMgtService } from '../member-mgt/member-mgt.service';
import { ItemMgtService } from '../item-mgt/item-mgt.service';

@Component({
  selector: 'app-onsite-order',
  templateUrl: './onsite-order.component.html',
  styleUrls: ['./onsite-order.component.css']
})
export class OnsiteOrderComponent implements OnInit {

  createForm: FormGroup;
  members;
  items;
  mealSets;

  constructor(private _preorderService: PreorderService,
              private _memberMgtService: MemberMgtService,
              private _itemMgtService: ItemMgtService,
              private _toastyService: ToastyService,
              private router: Router,
              private route: ActivatedRoute) {


    this.createForm = new FormGroup({
      'createDate': new FormControl(''),
      'lastUpdateDate': new FormControl(''),
      'buyer': new FormControl(),
      'buyerName': new FormControl(''),
      'type': new FormControl(''),
      'phone': new FormControl(''),
      'serveWay': new FormControl(''),
      'deliverDateTime': new FormControl(''),
      'deliverPeriod': new FormControl(''),
      'deliverAddress': new FormControl(''),
      'deliverBuilding': new FormControl(),
      'orderedItems': new FormControl([]),
      'orderedMealSets': new FormControl([]),
      'tags': new FormControl(''),
      'total': new FormControl(''),
      'note': new FormControl(''),
      'weather': new FormControl(''),
      'tempture': new FormControl(''),
      'beenDelivered': new FormControl(false),
      'marketingProgram': new FormControl(''),
      'buyerDiscount': new FormControl(0),
      'businessMemberPoint': new FormControl(0),
      'orderCode': new FormControl('')
    });

  }

  ngOnInit() {

    this._memberMgtService.getMembers().subscribe((members) => {
      this.members = members;
      console.log(this.members);
    });

    this._itemMgtService.getItems().subscribe((items) => {
      this.items = items;
      console.log(this.items);
    });

    this._itemMgtService.getMealsets().subscribe((mealSets) => {
      this.mealSets = mealSets;
      console.log(this.mealSets);
    });

  }

}
