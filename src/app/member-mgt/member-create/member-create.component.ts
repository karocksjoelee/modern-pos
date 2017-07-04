import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MemberMgtService } from '../member-mgt.service';
import * as moment from 'moment';


@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css']
})
export class MemberCreateComponent implements OnInit {

  ngHomeModal;
  ngOfficeModal;
  dateModel;
  createForm: FormGroup;
  apartmentBuildings;
  officeBuildings;
  selectedHomeBuilding;
  selectedOfficeBuilding;

  constructor(private _memberMgtService: MemberMgtService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.apartmentBuildings = 'building.category === 住宅華廈 / 其他';
    this.officeBuildings = 'building.category === 辦公大樓 / 醫院 / 一般商家 / 其他';

    this.createForm = new FormGroup({
      'type': new FormControl(''),
      'name': new FormControl(''),
      'birthday': new FormControl(''),
      'phone': new FormControl(''),
      'since': new FormControl(''),
      'line': new FormControl(''),
      'facebook': new FormControl(''),
      'email': new FormControl(''),
      'homeBuilding': new FormControl(),
      'homeAddress': new FormControl(''),
      'officeBuilding': new FormControl(),
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
      'orderHistories': new FormControl(),
    });

  } // end of ngOnint

  selectingHomeBuilding() {
    console.log('Home');
    this.ngHomeModal = true;
  }

  selectingOfficeBuilding() {
    console.log('Office');
    this.ngOfficeModal = true;
  }

  closeHomeModal() {
    this.ngHomeModal = false;
  }

  closeOfficeModal() {
    this.ngOfficeModal = false;
  }

  newMember() {
    console.log(this.createForm.value);
    this._memberMgtService.createMember(this.createForm.value).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        alert(error);
      },
      () => {
        alert('Completed');
        this.router.navigate(['../members'], { relativeTo: this.route });
      });

  }

  onSelectHomeBuilding(homeBuildingObject) {

    this.createForm.value.homeAddress = homeBuildingObject.address;
    this.createForm.value.homeBuilding = homeBuildingObject._id;

  }

  onSelectOfficeBuilding(officeBuildingObject) {

    this.createForm.value.officeAddress = officeBuildingObject.address;
    this.createForm.value.officeBuilding = officeBuildingObject._id;

  }


}
