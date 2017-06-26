import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  ngModal;

  constructor(private _itemMgtService: ItemMgtService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {

    this.ngModal = false;

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

  selectingItem() {
    this.ngModal = true;
  }


  itemSelected(item) {

    console.log(item);
    this.createForm.value.items.push(item);
    this.selectedItems.push(item.name);

  }

  closeModal() {
    this.ngModal = false;
  }

  createItem() {

    console.log(this.createForm.value);

  }

  goBack() {
    this.router.navigate(['../mealsets'], { relativeTo: this.route });
  }

}
