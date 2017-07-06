import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberMgtService } from '../member-mgt.service';

@Component({
  selector: 'app-building-create',
  templateUrl: './building-create.component.html',
  styleUrls: ['./building-create.component.css']
})
export class BuildingCreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private _memberMgtService: MemberMgtService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.createForm = new FormGroup({
      'name': new FormControl(''),
      'category': new FormControl(''),
      'address': new FormControl(''),
      'lat': new FormControl(''),
      'lng': new FormControl(''),
      'description': new FormControl('')
    });

  } // end of ngOnInit()


  newBuilding() {

    console.log(this.createForm.value);
    this._memberMgtService.createBuilding(this.createForm.value).subscribe(
      (response) => {
        console.log('Response :', response);
      },
      (error) => {
        alert(error);
      },
      () => {
        console.log('Completed');
        this.router.navigate(['../buildings'], { relativeTo: this.route });
    });

  }

}
