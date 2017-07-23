import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PreorderService } from '../preorder.service';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-onsite-list',
  templateUrl: './onsite-list.component.html',
  styleUrls: ['./onsite-list.component.css']
})
export class OnsiteListComponent implements OnInit {

  onsiteOrders;
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

    this._preorderService.getOnsiteByDate(now).subscribe(
      (onsiteorders) => {
        this.onsiteOrders = onsiteorders;
        this.onsiteOrders.map((onsiteorder) => {

          const itemQuantity = onsiteorder.orderedItems.reduce((sum, orderItem) => {
            return sum + orderItem.quantity;
          }, 0);

          const mealSetQuantity = onsiteorder.orderedMealSets.reduce((sum, orderMealSet) => {
            return sum + orderMealSet.quantity;
          }, 0);
          return onsiteorder.quantityCount = itemQuantity + mealSetQuantity;
        });
      },
      (err) => {
        alert(err);
      },
      () => {
        console.log(`[DATA] GOT ${now} ON-SITES`);
      }
    );
  }

  onChangeDate(dateString) {

    const targetDate = dateString.formatted.replace('/', '').replace('/', '');
    console.log(targetDate);

    this._preorderService.getOnsiteByDate(targetDate).subscribe(
      (onsiteOrders) => {
        this.onsiteOrders = [];
        this.onsiteOrders = onsiteOrders;
        this.onsiteOrders.map((onsiteOrder) => {

          const itemQuantity = onsiteOrder.orderedItems.reduce((sum, orderItem) => {
            return sum + orderItem.quantity;
          }, 0);

          const mealSetQuantity = onsiteOrder.orderedMealSets.reduce((sum, orderMealSet) => {
            return sum + orderMealSet.quantity;
          }, 0)
          return onsiteOrder.quantityCount = itemQuantity + mealSetQuantity;

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
