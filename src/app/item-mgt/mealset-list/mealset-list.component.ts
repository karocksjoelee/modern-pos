import { Component, OnInit } from '@angular/core';
import { ItemMgtService } from '../item-mgt.service';

@Component({
  selector: 'app-mealset-list',
  templateUrl: './mealset-list.component.html',
  styleUrls: ['./mealset-list.component.css']
})
export class MealsetListComponent implements OnInit {

  mealsets;

  constructor(private _itemMgtService: ItemMgtService) { }

  ngOnInit() {

    this._itemMgtService.getMealsets().subscribe((mealsets) => {
      this.mealsets = mealsets;
      console.log(this.mealsets);
    });

  }

}
