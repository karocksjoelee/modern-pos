import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemMgtService } from '../item-mgt.service';


@Component({
  selector: 'app-mealset-detail',
  templateUrl: './mealset-detail.component.html',
  styleUrls: ['./mealset-detail.component.css']
})
export class MealsetDetailComponent implements OnInit {

  private id: any;
  public mealSet: any;
  updateForm: FormGroup;

  constructor(private _itemMgtService: ItemMgtService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];

    this._itemMgtService.getMealsetById(this.id).subscribe((mealset) => {
      this.mealSet = mealset[0];
      console.log(mealset[0]);
      this.updateForm = new FormGroup({
        'setName': new FormControl(mealset[0].setName),
        'barcode': new FormControl(mealset[0].barcode),
        'price': new FormControl(mealset[0].price),
        'calorie': new FormControl(mealset[0].calorie || ''),
        'items': new FormControl(mealset[0].items),
        'image': new FormControl(mealset[0].image),
        'active': new FormControl(mealset[0].active),
        'description': new FormControl(mealset[0].description),
      });
    });

  }

  updateMealSet() {

    console.log(this.updateForm.value);
    this._itemMgtService.updateMealSet(this.mealSet._id, this.updateForm.value).subscribe(
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
