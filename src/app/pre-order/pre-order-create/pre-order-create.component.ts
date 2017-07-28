import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import * as moment from 'moment';
import * as _ from 'lodash';

import { PreorderService } from '../preorder.service';
import { MemberMgtService } from '../../member-mgt/member-mgt.service';
import { ItemMgtService } from '../../item-mgt/item-mgt.service';

@Component({
  selector: 'app-pre-order-create',
  templateUrl: './pre-order-create.component.html',
  styleUrls: ['./pre-order-create.component.css']
})
export class PreOrderCreateComponent implements OnInit {

  private datePickerOptions: INgxMyDpOptions = {
    dateFormat: 'yyyy/mm/dd',
    selectorHeight: '290px',
    selectorWidth: '260px'
  };

  createForm: FormGroup;
  ngMembersModal;
  ngBuildingsModal;
  ngItemsModal;
  ngMealSetsModal;
  selectedMember;
  selectedBuilding;
  selectedMeals = [];
  members;
  buildings;
  items;
  mealSets;
  beforeDiscount;
  discountClick = 0;
  discountArray = [];
  preUnExchanged;
  preExchanged;

  constructor(private _preorderService: PreorderService,
              private _memberMgtService: MemberMgtService,
              private _itemMgtService: ItemMgtService,
              private _toastyService: ToastyService,
              private router: Router,
              private route: ActivatedRoute) {


    this.createForm = new FormGroup({
      'createDate': new FormControl(''),
      'lastUpdateDate': new FormControl(''),
      'buyer': new FormControl(),
      'buyerName': new FormControl(''),
      'type': new FormControl(''),
      'phone': new FormControl(''),
      'serveWay': new FormControl(''),
      'deliverDateTime': new FormControl(''),
      'deliverPeriod': new FormControl(''),
      'deliverAddress': new FormControl(''),
      'deliverBuilding': new FormControl(),
      'orderedItems': new FormControl([]),
      'orderedMealSets': new FormControl([]),
      'tags': new FormControl(''),
      'total': new FormControl(''),
      'note': new FormControl(''),
      'weather': new FormControl(''),
      'tempture': new FormControl(''),
      'beenDelivered': new FormControl(false),
      'marketingProgram': new FormControl(''),
      'buyerDiscount': new FormControl(0),
      'businessMemberPoint': new FormControl(0),
      'orderCode': new FormControl('')
    });

  }

  ngOnInit() {

    this._memberMgtService.getMembers().subscribe((members) => {
      this.members = members;
    });

    this._memberMgtService.getBuildings().subscribe((buildings) => {
      this.buildings = buildings;
    });

    this._itemMgtService.getItems().subscribe((items) => {
      this.items = items;
    });

    this._itemMgtService.getMealsets().subscribe((mealSets) => {
      this.mealSets = mealSets;
    });

  }

  selectingMember() {
    this.ngMembersModal = true;
  }


  selectingBuilding() {
    this.ngBuildingsModal = true;
  }


  selectingItems() {
    this.ngItemsModal = true;
  }

  selectingMealSets() {
    this.ngMealSetsModal = true;
  }

  closeMembersModal() {
    this.ngMembersModal = false;
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


  newOrder() {

    if (this.createForm.value.deliverDateTime === '') {
      const toastErrOption: ToastOptions = {
          title: '操作提示',
          msg: `請選擇取餐時間`,
          timeout: 2000,
          theme: 'bootstrap'
      };
      this._toastyService.error(toastErrOption);
      return;
    }
    // Programatic Writing
    if (this.createForm.value.deliverDateTime.formatted) {
      this.createForm.patchValue({deliverDateTime: this.createForm.value.deliverDateTime.formatted});
    }
    this.createForm.patchValue({ createDate: moment().format()});
    const humanReadCode = `${this.createForm.value.deliverDateTime.replace('/', '').replace('/', '')}:${Math.floor(Math.random() * 9999) + 1}`;
    console.log(humanReadCode);
    this.createForm.patchValue({ orderCode: humanReadCode});
    // Store Object to id;
    this.createForm.value.orderedItems.map((ordered) => {
      return ordered.itemId = ordered.itemId._id;
    });
    this.createForm.value.orderedMealSets.map((ordered) => {
      return ordered.mealSetId = ordered.mealSetId._id;
    });

    this._preorderService.createSale(this.createForm.value).subscribe(
      (createdSaleResponse) => {
        const toastSuccessOption: ToastOptions = {
          title: '操作提示',
          msg: `新訂單 : ${this.createForm.value.orderCode}`,
          timeout: 4000,
          theme: 'bootstrap'
        };
        this._toastyService.success(toastSuccessOption);
        if (this.selectedMember) {
          this._memberMgtService.updateMember(this.selectedMember._id, this.selectedMember).subscribe(
            (memberResponse) => {
              const toastMemberSuccessOption: ToastOptions = {
                title: '操作提示',
                msg: `會員 - ${this.selectedMember.name} 累積紅利已更新`,
                timeout: 4000,
                theme: 'bootstrap'
              };
              this._toastyService.success(toastMemberSuccessOption);
            },
            (memberErr) => {
              console.log(memberErr);
            },
            () => {
              // Member Process Completed
              this.router.navigate(['../preorders'], {relativeTo: this.route});
            }
          );
        } else {
          this.router.navigate(['../preorders'], {relativeTo: this.route});
        }
      },
      (saleErr) => {
        console.log(saleErr);
      },
      () => {
        // Sale Process Completed
      }
    );

    console.log(this.createForm.value);
    console.log(this.selectedMember);

  } // end of newOrder()

  onSelectedMember(member) {
    if (this.selectedMember) {
      this.clearMember();
    }
    this.discountArray = [];
    this.createForm.patchValue({ buyer: member});
    this.createForm.patchValue({ buyerName: member.name });
    this.createForm.patchValue({ note: ''} );
    this.createForm.patchValue({ phone: member.phone });
    this.preUnExchanged = this.createForm.value.buyer.unExchanged;
    this.preExchanged = this.createForm.value.buyer.exchanged;
    this.selectedMember = this.createForm.value.buyer;

    const discount = Math.floor(this.preUnExchanged / 1000);

    for (let i = 0; i < discount; i++) {
      this.discountArray.push(100);
    }

    this.closeMembersModal();

  } // end of onSelectedMember()


  onSelectedBuilding(building) {

    this.selectedBuilding = building;
    this.createForm.patchValue({ deliverBuilding: building._id });
    this.createForm.patchValue({ deliverAddress: building.address });
    this.closeBuildingsModal();

  }


  onSelectedItem(inputItem) {

    this.increaseItemQuantity(inputItem);

  }

  onSelectedMealSet(inputMealSet) {

    this.increaseMealSetQuantity(inputMealSet);

  }

  clearMember() {

    this.createForm.patchValue({ buyerDiscount: 0});
    this.createForm.patchValue({ buyer: null });
    this.createForm.patchValue({ buyerName: '' });
    this.createForm.patchValue({ phone: ''});
    this.createForm.patchValue({ note: ''});
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

    const tempOrderedItems = this.createForm.value.orderedItems;
    const existItemIndex = tempOrderedItems
      .map((existedItem) => {
        return existedItem.itemId._id;
      })
      .indexOf(inputItem._id);

    if (existItemIndex < 0) {
      this.createForm.value.orderedItems.push({itemId: inputItem, quantity: 1});
    } else {
      this.createForm.value.orderedItems[existItemIndex].quantity ++;
    }

    this.caculateTotal();

  } // end of increaseItemQuantity()

  decreaseItemQuantity(inputItem) {

    const tempOrderedItems = this.createForm.value.orderedItems;
    const existItemIndex = tempOrderedItems
      .map((existedItem) => {
        return existedItem.itemId._id;
      })
      .indexOf(inputItem._id);

    if (existItemIndex < 0) {
      this.createForm.value.orderedItems.push({itemId: inputItem, quantity: 1});
    } else {
      if (this.createForm.value.orderedItems[existItemIndex].quantity > 1) {
        this.createForm.value.orderedItems[existItemIndex].quantity --;
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

    const tempOrderedItems = this.createForm.value.orderedItems;
    const existItemIndex = tempOrderedItems
      .map((existedItem) => {
        return existedItem.itemId._id;
      })
      .indexOf(inputItem._id);

    this.createForm.value.orderedItems.splice(existItemIndex, 1);

    this.caculateTotal();

  } // end of removeItem()

  increaseMealSetQuantity(inputMealSet) {

    const tempOrderedMealSets = this.createForm.value.orderedMealSets;
    const existMealSetIndex = tempOrderedMealSets
      .map((existedMealSet) => {
        return existedMealSet.mealSetId._id;
      })
      .indexOf(inputMealSet._id);

    if (existMealSetIndex < 0) {
      this.createForm.value.orderedMealSets.push({mealSetId: inputMealSet, quantity: 1});
    } else {
      this.createForm.value.orderedMealSets[existMealSetIndex].quantity ++;
    }

    this.caculateTotal();

  } // end of increaseMealSetQuantity()

  decreaseMealSetQuantity(inputMealSet) {

    const tempOrderedMealSets = this.createForm.value.orderedMealSets;
    const existMealSetIndex = tempOrderedMealSets
      .map((existedMealSet) => {
        return existedMealSet.mealSetId._id;
      })
      .indexOf(inputMealSet._id);

    if (existMealSetIndex < 0) {
      this.createForm.value.orderedMealSets.push({mealSetId: inputMealSet, quantity: 1});
    } else {
      if (this.createForm.value.orderedMealSets[existMealSetIndex].quantity > 1) {
        this.createForm.value.orderedMealSets[existMealSetIndex].quantity --;
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

    const tempOrderedMealSets = this.createForm.value.orderedMealSets;
    const existMealSetIndex = tempOrderedMealSets
      .map((existedMealSet) => {
        return existedMealSet.mealSetId._id;
      })
      .indexOf(inputMealSet._id);

    this.createForm.value.orderedMealSets.splice(existMealSetIndex, 1);

    this.caculateTotal();

  } // end of removeMealSet()

  onExchanging() {

    if (this.createForm.value.total <= 0) {
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
      const progrmaticNote = this.createForm.value.note.concat('\n[已使用一張折價券]');
      this.createForm.patchValue({buyerDiscount: this.discountClick});
      this.createForm.patchValue({note: progrmaticNote});
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

    console.log('BuyerDiscount: ', this.createForm.value.buyerDiscount);
    this.createForm.patchValue({businessMemberPoint: null});

    const itemsTotal = this.createForm.value.orderedItems.reduce((total, ordered) => {
      return total + ordered.itemId.price * ordered.quantity;
    }, 0);

    const mealSetsTotal = this.createForm.value.orderedMealSets.reduce((total, ordered) => {
      return total + ordered.mealSetId.price * ordered.quantity;
    }, 0);

    this.beforeDiscount = itemsTotal + mealSetsTotal;
    this.createForm.patchValue({total: this.beforeDiscount});

    if (this.createForm.value.buyer) {

      if (this.createForm.value.buyerDiscount > 0) {
        const afterDiscount = this.beforeDiscount - 100 * this.createForm.value.buyerDiscount;
        this.createForm.patchValue({total: afterDiscount});
        if (this.createForm.value.buyer.type === 'business' && this.createForm.value.total >= 1000) {
          // (1) Give Business Bonus Point :
          const bonusWeight = Math.floor(this.createForm.value.total / 1000);
          this.selectedMember.unExchanged = this.preUnExchanged + 100 * bonusWeight;
          this.createForm.patchValue({businessMemberPoint: 100 * bonusWeight});
          // (2) Increase Member UnExchanged (After Discount)
          this.selectedMember.unExchanged = this.preUnExchanged + 100 * bonusWeight + this.createForm.value.total;
          // (3) Increase Member ExChanged (After Discount)
          this.selectedMember.exchanged = this.preExchanged + 1000 * this.createForm.value.buyerDiscount;
        } else {
          this.selectedMember.unExchanged = this.preUnExchanged + this.createForm.value.total;
          this.selectedMember.exchanged = this.preExchanged + 1000 * this.createForm.value.buyerDiscount;
        }
      } else {
        if (this.createForm.value.buyer.type === 'business' && this.createForm.value.total >= 1000) {
          // Give Business Bonus Point :
          const bonusWeight = Math.floor(this.createForm.value.total / 1000);
          this.selectedMember.unExchanged = this.preUnExchanged + 100 * bonusWeight;
          this.createForm.patchValue({businessMemberPoint: 100 * bonusWeight});
          // Increase Member UnExChanged (Non Discount)
          this.selectedMember.unExchanged = this.preUnExchanged + 100 * bonusWeight + this.createForm.value.total;
        } else {
          this.selectedMember.unExchanged = this.preUnExchanged + this.createForm.value.total;
        }
      } // end of check if else discounted

    } // end of check if isMember;

  } // end of caculateTotal()

}
