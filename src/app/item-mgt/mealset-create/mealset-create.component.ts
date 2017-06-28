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

    this._itemMgtService.getItems().subscribe((items) => {
      this.items = items;
    });

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
    this.createForm.value.items.push(item._id);
    this.selectedItems.push(item.name);

  }

  closeModal() {
    this.ngModal = false;
  }

  createItem() {

    console.log(this.createForm.value);
    this._itemMgtService.createMealset(this.createForm.value).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        alert(error);
      },
      () => {
        console.log('Completed');
        this.router.navigate(['../mealsets'], { relativeTo: this.route });
      });

  }

  goBack() {
    this.router.navigate(['../mealsets'], { relativeTo: this.route });
  }

}
