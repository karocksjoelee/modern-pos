import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberMgtService } from '../member-mgt.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  private id: string;
  public member: any;
  updateForm: FormGroup;

  constructor(private _memberMgtService: MemberMgtService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this._memberMgtService.getMember(this.id).subscribe((member) => {
      this.member = member;
      this.updateForm = new FormGroup({
        'type': new FormControl(this.member.type),
        'name': new FormControl(this.member.name),
        'birthday': new FormControl(this.member.birthday),
        'phone': new FormControl(this.member.phone),
        'since': new FormControl(this.member.since),
        'line': new FormControl(this.member.line),
        'facebook': new FormControl(this.member.facebook),
        'email': new FormControl(this.member.email),
        'homeBuilding': new FormControl(this.member.homeBuilding),
        'homeAddress': new FormControl(this.member.homeAddress),
        'officeBuilding': new FormControl(this.member.officeBuilding),
        'officeAddress': new FormControl(this.member.officeAddress),
        'gender': new FormControl(this.member.gender),
        'age': new FormControl(this.member.age),
        'weight': new FormControl(this.member.weight),
        'height': new FormControl(this.member.height),
        'tags': new FormControl(this.member.tags),
        'membershipTerm': new FormControl(this.member.membershipTerm),
        'memberStatus': new FormControl(this.member.memberStatus),
        'unExchanged': new FormControl(this.member.unExchanged),
        'exchanged': new FormControl(this.member.exchanged),
        'orderHistories': new FormControl(this.member.orderHistories)
      });
    });

  }

  updateMember() {
    console.log(this.updateForm.value);
    this._memberMgtService.updateMember(this.id, this.updateForm.value).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        alert(error);
      },
      () => {
        console.log('Completed');
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }

}
