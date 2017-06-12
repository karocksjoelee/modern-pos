import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit {

  public categories = ['肉料理', '魚料理', '主廚發揮', '蔬食料理' , '果汁' , '咖啡' ];
  public units = ['盒' , '杯', '份'];
  createForm: FormGroup;


  constructor() { }

  ngOnInit() {

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

    if(this.createForm.value.active === null) {
      this.createForm.value.active = false;
    }

    console.log(this.createForm.value);
  }



}
