import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-mgt',
  templateUrl: './member-mgt.component.html',
  styleUrls: ['./member-mgt.component.css']
})
export class MemberMgtComponent implements OnInit {

  actived;

  constructor() { }

  ngOnInit() {

    this.actived = 'memberActived';
  }

}
