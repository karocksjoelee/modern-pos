import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ItemMgtService } from '../item-mgt.service';
import { AccountingService } from '../../accounting/accounting.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit {

  public mainIngredients ;
  public selectedIngredient;
  createForm: FormGroup;
  ngModal;

  constructor( private _itemMgtService: ItemMgtService,
               private _accountingService: AccountingService,
               private router: Router, 
               private route: ActivatedRoute ) { }

  ngOnInit() {

    this.ngModal = false;

    this.mainIngredients = this._accountingService.getMainIngredients();
    console.log(this.mainIngredients);

    this.createForm = new FormGroup({
      'category': new FormControl(''),
      'name': new FormControl(''),
      'barcode': new FormControl(''),
      'price': new FormControl(0),
      'unit': new FormControl(''),
      'image': new FormControl(''),
      'calorie': new FormControl(0),
      'ingredient': new FormControl(''),
      'description': new FormControl(''),
      'active': new FormControl(),
    });

  }

  createItem() {

    if (this.createForm.value.active === null) {
      this.createForm.value.active = false;
    }

    console.log(this.createForm.value);

  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ingredientSelected(input: any) {

    console.log(input);
    this.createForm.value.ingredient = input.subjectName;
    this.selectedIngredient = input.subjectName;
    this.ngModal = false;
    // this.staticModal.hide();

  }

  selectingIngredient() {
    this.ngModal = true;
  }



}
