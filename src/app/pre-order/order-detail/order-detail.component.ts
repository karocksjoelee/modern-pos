import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import * as moment from 'moment';
import * as _ from 'lodash';

import { PreorderService } from '../preorder.service';
import { ItemMgtService } from '../../item-mgt/item-mgt.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  sale;
  items;
  mealSets;
  updateForm: FormGroup;

  constructor(private _preorderService: PreorderService,
              private _itemMgtService: ItemMgtService,
              private router: Router,
              private route: ActivatedRoute) {
               }

  ngOnInit() {

    // GET Sale By id
    this._preorderService.getSale(this.route.snapshot.params.id).subscribe(
      (sale) => {
        this.sale = sale[0];
        this.updateForm = new FormGroup({
          'createDate': new FormControl(this.sale.createDate),
          'lastUpdateDate': new FormControl(this.sale.lastUpdateDate),
          'buyer': new FormControl(this.sale.buyer),
          'buyerName': new FormControl(this.sale.buyerName),
          'type': new FormControl(this.sale.type),
          'phone': new FormControl(this.sale.phone),
          'serveWay': new FormControl(this.sale.serveWay),
          'deliverDateTime': new FormControl(this.sale.deliverDateTime),
          'deliverPeriod': new FormControl(this.sale.deliverPeriod),
          'deliverAddress': new FormControl(this.sale.deliverAddress),
          'deliverBuilding': new FormControl(this.sale.deliverBuilding),
          'orderedItems': new FormControl(this.sale.orderedItems),
          'orderedMealSets': new FormControl(this.sale.orderedMealSets),
          'tags': new FormControl(this.sale.tags),
          'total': new FormControl(this.sale.total),
          'note': new FormControl(this.sale.note),
          'weather': new FormControl(this.sale.weather),
          'tempture': new FormControl(this.sale.tempture),
          'beenDelivered': new FormControl(this.sale.beenDelivered),
          'marketingProgram': new FormControl(this.sale.marketingProgram),
          'buyerDiscount': new FormControl(this.sale.buyerDiscount),
          'businessMemberPoint': new FormControl(this.sale.businessMemberPoint),
          'orderCode': new FormControl(this.sale.orderCode)
        });
        console.log(this.updateForm.value);
      },
      (err) => {
        console.log(`[DB] GET SALE BY ID ERROR`);
        alert(err);
      },
      () => {
        // do nothing for now;
      }
    );

    // Get Items
    this._itemMgtService.getItems().subscribe(
      (items) => {
        this.items = items;
        console.log(this.items);
      },
      (err) => {
        console.log(`[DB] GET ITEMS ERROR`);
        alert(err);
      },
      () => {
        // do nothing for now;
      }
    );

    // Get MealSets
    this._itemMgtService.getMealsets().subscribe(
      (mealSets) => {
        this.mealSets = mealSets;
        console.log(this.mealSets);
      },
      (err) => {
        console.log(`[DB] GET ITEMS ERROR`);
        alert(err);
      },
      () => {
        // do nothing for now;
      }
    );
  } // end of ngOnInit()

}
