import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ItemMgtService } from '../item-mgt.service';
import { AccountingService } from '../../accounting/accounting.service';


@Component({
  selector: 'app-mealset-create',
  templateUrl: './mealset-create.component.html',
  styleUrls: ['./mealset-create.component.css']
})
export class MealsetCreateComponent implements OnInit {

  createForm: FormGroup;
  selectedItems = [];
  items;

  constructor(private _itemMgtService: ItemMgtService) { }


  ngOnInit() {

    this.items = this._itemMgtService.getItems();

    this.createForm = new FormGroup({
      'setName': new FormControl(''),
      'barcode': new FormControl(''),
      'price': new FormControl(''),
      'items': new FormControl([]),
      'image': new FormControl(''),
      'active': new FormControl(''),
      'calorie': new FormControl(''),
      'description': new FormControl('')
    });

  }


  itemSelected(item, bsModal) {

    this.createForm.value.items.push(item);
    this.selectedItems.push(item);

  }


  createItem() {

    console.log(this.createForm.value);

  }

}
