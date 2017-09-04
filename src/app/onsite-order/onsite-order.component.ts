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
  ngMembersModal;
  tags: Array<Object> = [
    { tagName: '男性', tagStatus: false },{ tagName: '女性', tagStatus: false },
    { tagName: '老年人', tagStatus: false },{ tagName: '青壯年', tagStatus: false },
    { tagName: '情侶', tagStatus: false },{ tagName: '家庭', tagStatus: false },
    { tagName: '常客', tagStatus: false },{ tagName: '久待', tagStatus: false },
    { tagName: 'LN預訂', tagStatus: false },{ tagName: 'LN點餐', tagStatus: false },
    { tagName: 'FB點餐', tagStatus: false },{ tagName: '健身族', tagStatus: false },
    { tagName: '同事', tagStatus: false },{ tagName: '上班族', tagStatus: false },
  ];


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
      'serveWay': new FormControl('take-out'),
      'deliverDateTime': new FormControl(''),
      'deliverPeriod': new FormControl(''),
      'deliverAddress': new FormControl(''),
      'deliverBuilding': new FormControl(),
      'orderedItems': new FormControl([]),
      'orderedMealSets': new FormControl([]),
      'tags': new FormControl(this.tags),
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

  setTakeOut() {
    this.createForm.patchValue({ serveWay : 'take-out'});
  }

  setEatHere() {
    this.createForm.patchValue({ serveWay : 'eat-here'});
  }

  updateTag(targetTag) {
    this.createForm.value.tags.forEach((tag) => {
      if (tag.tagName === targetTag.tagName) {
        if (tag.tagStatus) {
          tag.tagStatus = false;
        } else {
          tag.tagStatus = true;
        }
      }
    });
  }

  selectingMember() {
    this.ngMembersModal = true;
  }

  closeMembersModal() {
    this.ngMembersModal = false;
  }

  newOrder() {
    console.log(this.createForm.value);
  }

}
