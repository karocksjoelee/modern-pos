import { Component, OnInit } from '@angular/core';
import { ItemMgtService } from './item-mgt.service';

@Component({
  selector: 'app-item-mgt',
  templateUrl: './item-mgt.component.html',
  styleUrls: ['./item-mgt.component.css']
})
export class ItemMgtComponent implements OnInit {

  items;
  mealsets;

  constructor( private _itemMgtService: ItemMgtService ) { }

  ngOnInit() {

    this.items = this._itemMgtService.getItems();
    this.mealsets = this._itemMgtService.getMealsets();

    console.log(this.items);
    console.log(this.mealsets);

  } // end of ngOnInit()

}
