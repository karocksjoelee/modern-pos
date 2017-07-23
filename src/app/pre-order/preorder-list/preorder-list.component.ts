import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PreorderService } from '../preorder.service';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-preorder-list',
  templateUrl: './preorder-list.component.html',
  styleUrls: ['./preorder-list.component.css']
})
export class PreorderListComponent implements OnInit {

  preorders;
  now = new Date();

  private datePickerOptions: INgxMyDpOptions = {
    dateFormat: 'yyyy/mm/dd',
    selectorHeight: '290px',
    selectorWidth: '260px'
  };

  public dateModel = {
    date: {
      year: this.now.getFullYear(),
      month: this.now.getMonth() + 1,
      day: this.now.getDate()
    }
  };


  constructor(private _preorderService: PreorderService, private route: ActivatedRoute) { }

  ngOnInit() {

    const now = moment().format('YYYYMMDD');

    this._preorderService.getPreOrdersByDate(now).subscribe(
      (preorders) => {
        this.preorders = preorders;
        this.preorders.map((preorder) => {

          const itemQuantity = preorder.orderedItems.reduce((sum, orderItem) => {
            return sum + orderItem.quantity;
          }, 0);

          const mealSetQuantity = preorder.orderedMealSets.reduce((sum, orderMealSet) => {
            return sum + orderMealSet.quantity;
          }, 0);
          return preorder.quantityCount = itemQuantity + mealSetQuantity;
        });
      },
      (err) => {
        alert(err);
      },
      () => {
        console.log(`[DATA] GOT ${now} PRE-ORDERS`);
      }
    );
  }

  onChangeDate(dateString) {

    const targetDate = dateString.formatted.replace('/', '').replace('/', '');

    this._preorderService.getPreOrdersByDate(targetDate).subscribe(
      (preorders) => {
        this.preorders = [];
        this.preorders = preorders;
        this.preorders.map((preorder) => {

          const itemQuantity = preorder.orderedItems.reduce((sum, orderItem) => {
            return sum + orderItem.quantity;
          }, 0);

          const mealSetQuantity = preorder.orderedMealSets.reduce((sum, orderMealSet) => {
            return sum + orderMealSet.quantity;
          }, 0)
          return preorder.quantityCount = itemQuantity + mealSetQuantity;

        });

      },
      (err) => {
        alert(err);
      },
      () => {
        console.log('ALL');
      }
    );

  }

}
