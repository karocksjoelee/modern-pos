import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import * as moment from 'moment';
import * as _ from 'lodash';

import { PreorderService } from '../preorder.service';
import { ItemMgtService } from '../../item-mgt/item-mgt.service';
import { MemberMgtService } from '../../member-mgt/member-mgt.service';

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

  ngBuildingsModal;
  ngItemsModal;
  ngMealSetsModal;

  selectedMember;
  selectedBuilding;
  preUnExchanged;
  preExchanged;

  discountClick;
  discountArray = [];
  beforeDiscount;

  constructor(private _preorderService: PreorderService,
              private _memberMgtService: MemberMgtService,
              private _itemMgtService: ItemMgtService,
              private _toastyService: ToastyService,
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
         this.discountClick = this.sale.buyerDiscount;
        // Recover Member
        this.selectedMember = this.sale.buyer;
        // Recover Member Points
        this.preUnExchanged = this.sale.buyer.unExchanged - this.updateForm.value.total - this.updateForm.value.businessMemberPoint + ( 1000 * this.updateForm.value.buyerDiscount );
        this.preExchanged = this.sale.buyer.exchanged - (1000 * this.updateForm.value.buyerDiscount);
        console.log('PRE-UN: ', this.preUnExchanged);
        console.log('PRE-EX: ', this.preExchanged);
        const discount = Math.floor(this.preUnExchanged / 1000);
        for (let i = 0; i < discount; i++) {
          this.discountArray.push(100);
        }
        // Fixing Used Discout Array 
        for ( let i = 0 ; i < this.updateForm.value.buyerDiscount; i++) {
          this.discountArray.pop();
        }
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

  selectingBuilding() {
    this.ngBuildingsModal = true;
  }

  selectingItems() {
    this.ngItemsModal = true;
  }

  selectingMealSets() {
    this.ngMealSetsModal = true;
  }

  closeBuildingsModal() {
    this.ngBuildingsModal = false;
  }

  closeMealSetsModal() {
    this.ngMealSetsModal = false;
  }

  closeItemsModal() {
    this.ngItemsModal = false;
  }

  updateOrder() {
    console.log(this.updateForm.value);
    console.log(this.selectedMember);
    this.updateForm.value.orderedItems.map((ordered) => {
      return ordered.itemId = ordered.itemId._id;
    });
    this.updateForm.value.orderedMealSets.map((ordered) => {
      return ordered.mealSetId = ordered.mealSetId._id;
    });
    this._preorderService.updateSale(this.sale._id, this.updateForm.value).subscribe(
      (saleResponse) => {
        const toastSaleSuccessOption: ToastOptions = {
          title: '操作提示',
          msg: `已更新訂單 : ${this.updateForm.value.orderCode} !`,
          timeout: 4000,
          theme: 'bootstrap'
        };
        this._toastyService.success(toastSaleSuccessOption);
        if (this.selectedMember) {
            this._memberMgtService.updateMember(this.selectedMember._id, this.selectedMember).subscribe(
              (memberResponse) => {
                const toastMemberSuccessOption: ToastOptions = {
                  title: '操作提示',
                  msg: `已更新會員 : ${this.selectedMember.name} 紅利 !`,
                  timeout: 4000,
                  theme: 'bootstrap'
                };
                this._toastyService.success(toastMemberSuccessOption);
              },
              (err) => {
                alert(err);
              },
              () => {
                this.router.navigate(['../preorders'], {relativeTo: this.route});
              }
            );
        }
      },
      (err) => {
        alert(err);
      },
      () => {
        // Do nothing for now 
        this.router.navigate(['../preorders'], {relativeTo: this.route});
      }
    );
  }

  deleteOrder() {
    const res = confirm('你正刪除這筆訂單，你確定嗎？');
    this.selectedMember.unExchanged = this.preUnExchanged;
    this.selectedMember.exchanged = this.preExchanged;
    if (res === true) {
      this._memberMgtService.updateMember(this.selectedMember._id, this.selectedMember).subscribe(
        (memberResponse) => {
          const toastMemberSuccessOption: ToastOptions = {
                title: '操作提示',
                msg: `會員 - ${this.selectedMember.name} 上筆累積紅利已刪除 !`,
                timeout: 4000,
                theme: 'bootstrap'
          };
          this._toastyService.success(toastMemberSuccessOption);
          this._preorderService.deletePreorder(this.sale._id).subscribe(
            (saleResponse) => {
              const toastSaleSuccessOption: ToastOptions = {
                title: '操作提示',
                msg: `訂單 ${this.sale.orderCode} 已成功刪除 !`,
                timeout: 5000,
                theme: 'bootstrap'
              };
              this._toastyService.success(toastSaleSuccessOption);
            },
            (err) => {
              alert(err);
            },
            () => {
              this.router.navigate(['../preorders'], {relativeTo: this.route});
            }
          );
        },
        (err) => {
          alert(err);
        },
        () => {
          // Do nothing for now
        }
      );
    }
  }

  onSelectedBuilding(building) {

    this.selectedBuilding = building;
    this.updateForm.patchValue({ deliverBuilding: building._id });
    this.updateForm.patchValue({ deliverAddress: building.address });
    this.closeBuildingsModal();

  }

  onSelectedItem(inputItem) {

    this.increaseItemQuantity(inputItem);

  }

  onSelectedMealSet(inputMealSet) {

    this.increaseMealSetQuantity(inputMealSet);

  }

  clearMember() {

    this.updateForm.patchValue({ buyerDiscount: 0});
    this.updateForm.patchValue({ buyer: null });
    this.updateForm.patchValue({ buyerName: '' });
    this.updateForm.patchValue({ phone: ''});
    this.updateForm.patchValue({ note: ''});
    this.selectedMember = null;

    if (this.discountClick > 0) {
      this.discountClick = 0;
    }

    const toastWarnOption: ToastOptions = {
        title: '操作提示',
        msg: '會員資料清除',
        timeout: 4000,
        theme: 'bootstrap'
    };

    this._toastyService.warning(toastWarnOption);

    this.caculateTotal();

  } // end of clearMember()

  increaseItemQuantity(inputItem) {

    const tempOrderedItems = this.updateForm.value.orderedItems;
    const existItemIndex = tempOrderedItems
      .map((existedItem) => {
        return existedItem.itemId._id;
      })
      .indexOf(inputItem._id);

    if (existItemIndex < 0) {
      this.updateForm.value.orderedItems.push({itemId: inputItem, quantity: 1});
    } else {
      this.updateForm.value.orderedItems[existItemIndex].quantity ++;
    }

    this.caculateTotal();

  } // end of increaseItemQuantity()

  decreaseItemQuantity(inputItem) {

    const tempOrderedItems = this.updateForm.value.orderedItems;
    const existItemIndex = tempOrderedItems
      .map((existedItem) => {
        return existedItem.itemId._id;
      })
      .indexOf(inputItem._id);

    if (existItemIndex < 0) {
      this.updateForm.value.orderedItems.push({itemId: inputItem, quantity: 1});
    } else {
      if (this.updateForm.value.orderedItems[existItemIndex].quantity > 1) {
        this.updateForm.value.orderedItems[existItemIndex].quantity --;
      } else {
        this.removeItem(inputItem);
      }
    }

    this.caculateTotal();

  } // end of decreaseItemQuantity()

  removeItem(inputItem) {

    const toastWarnOption: ToastOptions = {
        title: '操作提示',
        msg: `已刪除餐點: ${inputItem.name}`,
        timeout: 2000,
        theme: 'bootstrap'
    };

    this._toastyService.warning(toastWarnOption);

    const tempOrderedItems = this.updateForm.value.orderedItems;
    const existItemIndex = tempOrderedItems
      .map((existedItem) => {
        return existedItem.itemId._id;
      })
      .indexOf(inputItem._id);

    this.updateForm.value.orderedItems.splice(existItemIndex, 1);

    this.caculateTotal();

  } // end of removeItem()

  increaseMealSetQuantity(inputMealSet) {

    const tempOrderedMealSets = this.updateForm.value.orderedMealSets;
    const existMealSetIndex = tempOrderedMealSets
      .map((existedMealSet) => {
        return existedMealSet.mealSetId._id;
      })
      .indexOf(inputMealSet._id);

    if (existMealSetIndex < 0) {
      this.updateForm.value.orderedMealSets.push({mealSetId: inputMealSet, quantity: 1});
    } else {
      this.updateForm.value.orderedMealSets[existMealSetIndex].quantity ++;
    }

    this.caculateTotal();

  } // end of increaseMealSetQuantity()

  decreaseMealSetQuantity(inputMealSet) {

    const tempOrderedMealSets = this.updateForm.value.orderedMealSets;
    const existMealSetIndex = tempOrderedMealSets
      .map((existedMealSet) => {
        return existedMealSet.mealSetId._id;
      })
      .indexOf(inputMealSet._id);

    if (existMealSetIndex < 0) {
      this.updateForm.value.orderedMealSets.push({mealSetId: inputMealSet, quantity: 1});
    } else {
      if (this.updateForm.value.orderedMealSets[existMealSetIndex].quantity > 1) {
        this.updateForm.value.orderedMealSets[existMealSetIndex].quantity --;
      } else {
        this.removeMealSet(inputMealSet);
      }
    }

    this.caculateTotal();

  } // end of decreaseMealSetQuantity()

  removeMealSet(inputMealSet) {

    const toastWarnOption: ToastOptions = {
        title: '操作提示',
        msg: `已刪除套餐: ${inputMealSet.setName}`,
        timeout: 2000,
        theme: 'bootstrap'
    };

    this._toastyService.warning(toastWarnOption);

    const tempOrderedMealSets = this.updateForm.value.orderedMealSets;
    const existMealSetIndex = tempOrderedMealSets
      .map((existedMealSet) => {
        return existedMealSet.mealSetId._id;
      })
      .indexOf(inputMealSet._id);

    this.updateForm.value.orderedMealSets.splice(existMealSetIndex, 1);

    this.caculateTotal();

  } // end of removeMealSet()

  onExchanging() {

    if (this.updateForm.value.total <= 0) {
      const toastErrOption: ToastOptions = {
        title: '操作提示',
        msg: '結帳金額低於或等於 0 ',
        timeout: 4000,
        theme: 'bootstrap'
      };
      this._toastyService.error(toastErrOption);
    } else {
      this.discountClick++;
      this.discountArray.pop();
      const progrmaticNote = this.updateForm.value.note.concat('\n[已使用一張折價券]');
      this.updateForm.patchValue({buyerDiscount: this.discountClick});
      this.updateForm.patchValue({note: progrmaticNote});
      this.caculateTotal();

      const toastSuccessOption: ToastOptions = {
        title: '操作提示',
        msg: '已使用一張折價券',
        timeout: 4000,
        theme: 'bootstrap'
      };
      this._toastyService.success(toastSuccessOption);
    }

  } // end of onExchanging()

  caculateTotal() {

    console.log('BuyerDiscount: ', this.updateForm.value.buyerDiscount);
    this.updateForm.patchValue({businessMemberPoint: null});

    const itemsTotal = this.updateForm.value.orderedItems.reduce((total, ordered) => {
      return total + ordered.itemId.price * ordered.quantity;
    }, 0);

    const mealSetsTotal = this.updateForm.value.orderedMealSets.reduce((total, ordered) => {
      return total + ordered.mealSetId.price * ordered.quantity;
    }, 0);

    this.beforeDiscount = itemsTotal + mealSetsTotal;
    this.updateForm.patchValue({total: this.beforeDiscount});

    if (this.updateForm.value.buyer) {

      if (this.updateForm.value.buyerDiscount > 0) {
        const afterDiscount = this.beforeDiscount - 100 * this.updateForm.value.buyerDiscount;
        this.updateForm.patchValue({total: afterDiscount});
        if (this.updateForm.value.buyer.type === 'business' && this.updateForm.value.total >= 1000) {
          // (1) Give Business Bonus Point :
          const bonusWeight = Math.floor(this.updateForm.value.total / 1000);
          this.selectedMember.unExchanged = this.preUnExchanged + 100 * bonusWeight;
          this.updateForm.patchValue({businessMemberPoint: 100 * bonusWeight});
          // (2) Increase Member UnExchanged (After Discount)
          this.selectedMember.unExchanged = this.preUnExchanged + 100 * bonusWeight + this.updateForm.value.total;
          // (3) Increase After Discount total & Decrease Member UnExchanged (After Discount)
          this.selectedMember.unExchanged = this.preUnExchanged + 100 * bonusWeight + this.updateForm.value.total - 1000 * this.updateForm.value.buyerDiscount;
          // (4) Increase Member ExChanged (After Discount)
          this.selectedMember.exchanged = this.preExchanged + 1000 * this.updateForm.value.buyerDiscount;
        } else {
          this.selectedMember.unExchanged = this.preUnExchanged + this.updateForm.value.total - 1000 * this.updateForm.value.buyerDiscount;
          this.selectedMember.exchanged = this.preExchanged + 1000 * this.updateForm.value.buyerDiscount;
        }
      } else {

        if (this.updateForm.value.buyer.type === 'business' && this.updateForm.value.total >= 1000) {
          // (1) Give Business Bonus Point :
          const bonusWeight = Math.floor(this.updateForm.value.total / 1000);
          this.selectedMember.unExchanged = this.preUnExchanged + 100 * bonusWeight;
          this.updateForm.patchValue({businessMemberPoint: 100 * bonusWeight});
          // (2) Increase Member UnExChanged (Non Discount)
          this.selectedMember.unExchanged = this.preUnExchanged + 100 * bonusWeight + this.updateForm.value.total;
        } else {
          this.selectedMember.unExchanged = this.preUnExchanged + this.updateForm.value.total;
        }

      } // end of check if else discounted

    } // end of check if isMember;

  } // end of caculateTotal()


}
