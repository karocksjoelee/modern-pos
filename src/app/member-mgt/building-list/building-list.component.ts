import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberMgtService } from '../member-mgt.service';


@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.css']
})
export class BuildingListComponent implements OnInit {

  buildings;

  constructor(private _memberMgtService: MemberMgtService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this._memberMgtService.getBuildings().subscribe((buildings) => {
      this.buildings = buildings;
      console.log(this.buildings);
    });

  }

}
