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

  private sub: any;
  public mealset: any;
  editForm: FormGroup;

  constructor(private _itemMgtService: ItemMgtService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe((params) => {

      this.mealset = this._itemMgtService.getMealsetById(params['id']);
      this.editForm = new FormGroup({
        'setName': new FormControl({value: this.mealset[0].setName, disable: true}),
        'barcode': new FormControl({value: this.mealset[0].barcode, disable: true}),
        'price': new FormControl({value: this.mealset[0].price}),
        'items': new FormControl({value: this.mealset[0].items, disable: true}),
        'image': new FormControl({value: this.mealset[0].image}),
        'active': new FormControl({value: this.mealset[0].active})
      });

    });
  }

}
