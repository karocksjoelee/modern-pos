import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberMgtService } from '../member-mgt.service';


@Component({
  selector: 'app-building-detail',
  templateUrl: './building-detail.component.html',
  styleUrls: ['./building-detail.component.css']
})
export class BuildingDetailComponent implements OnInit {

  private id: string;
  public building: any;
  updateForm: FormGroup;

  constructor(private _memberMgtService: MemberMgtService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];

    this._memberMgtService.getBuilding(this.id).subscribe((building) => {

      this.building = building[0];
      this.updateForm = new FormGroup({
        'name': new FormControl(this.building.name),
        'category': new FormControl(this.building.category),
        'address': new FormControl(this.building.address),
        'lat': new FormControl(this.building.lat),
        'lng': new FormControl(this.building.lng),
        'description': new FormControl(this.building.description),
      });
    });

  }

  updateBuilding() {
    console.log(this.updateForm.value);
    this._memberMgtService.updateBuilding(this.id,this.updateForm.value).subscribe(
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
