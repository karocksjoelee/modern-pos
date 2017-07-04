import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberMgtService } from '../member-mgt.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members;

  constructor(private _memberMgtService: MemberMgtService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this._memberMgtService.getMembers().subscribe((buildings) => {
      this.members = buildings;
      console.log(this.members);
    });

  }

}
