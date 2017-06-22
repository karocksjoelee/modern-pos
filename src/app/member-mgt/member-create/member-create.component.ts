import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MemberMgtService } from '../member-mgt.service';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css']
})
export class MemberCreateComponent implements OnInit {

  public genders = ['男性', '女性', '其他'];
  modal;
  createForm: FormGroup;
  apartmentBuildings;
  officeBuildings;

  constructor(private _memberMgtService: MemberMgtService) { }

  ngOnInit() {

    this.apartmentBuildings = 'building.category === 住宅華廈 / 其他';
    this.officeBuildings = 'building.category === 辦公大樓 / 醫院 / 一般商家 / 其他';

    this.createForm = new FormGroup({
      'name': new FormControl(''),
      'birthday': new FormControl(''),
      'phone': new FormControl(''),
      'since': new FormControl(''),
      'line': new FormControl(''),
      'facebook': new FormControl(''),
      'email': new FormControl(''),
      'homeBuilding': new FormControl(''),
      'homeAddress': new FormControl(''),
      'officeBuilding': new FormControl(''),
      'officeAddress': new FormControl(''),
      'gender': new FormControl(''),
      'age': new FormControl(''),
      'weight': new FormControl(''),
      'height': new FormControl(''),
      'tags': new FormControl(''),
      'membershipTerm': new FormControl(''),
      'memberStatus': new FormControl(''),
      'unExchanged': new FormControl(''),
      'exchanged': new FormControl(''),
      'orderHistories': new FormControl(''),
    });

  } // end of ngOnint

  createMember() {
    console.log(this.createForm.value);
  }

  onSelectHomeBuilding(homeBuildingObject) {

    this.createForm.value.homeAddress = homeBuildingObject.address;

  }

  onSelectOfficeBuilding(officeBuildingObject) {

    this.createForm.value.officeAddress = officeBuildingObject.address;

  }


}
