import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MemberMgtService } from '../member-mgt.service';

@Component({
  selector: 'app-building-create',
  templateUrl: './building-create.component.html',
  styleUrls: ['./building-create.component.css']
})
export class BuildingCreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private _memberMgtService: MemberMgtService) { }

  ngOnInit() {

    this.createForm = new FormGroup({
      'name': new FormControl(''),
      'category': new FormControl(''),
      'address': new FormControl(''),
      'lat': new FormControl(''),
      'lng': new FormControl(''),
      'description': new FormControl(''),
    });

  } // end of ngOnInit()


  createBuilding() {
    console.log(this.createForm.value);
  }

}
