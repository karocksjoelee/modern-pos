import { Component, OnInit, ViewChild } from '@angular/core';
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

  public categories = ['肉料理', '魚料理', '主廚發揮', '蔬食料理' , '果汁' , '咖啡' ];
  public units = ['盒' , '杯', '份'];
  public mainIngredients ;
  createForm: FormGroup;
  public selectedIngredient;
  @ViewChild('staticModal') staticModal;


  constructor(private _itemMgtService: ItemMgtService, private _accountingService: AccountingService ) { }

  ngOnInit() {

    this.mainIngredients = this._accountingService.getMainIngredients();
    console.log(this.mainIngredients);

    this.createForm = new FormGroup({
      'category': new FormControl(''),
      'name': new FormControl(''),
      'barCode': new FormControl(''),
      'price': new FormControl(0),
      'unit': new FormControl('盒'),
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

  ingredientSelected(input: any) {

    this.createForm.value.ingredient = input.subjectName;
    this.selectedIngredient = input.subjectName;
    this.staticModal.hide();

  }



}
