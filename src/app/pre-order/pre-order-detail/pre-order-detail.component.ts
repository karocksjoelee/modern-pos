import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import * as moment from 'moment';
import * as _ from 'lodash';

import { PreorderService } from '../preorder.service';
import { MemberMgtService } from '../../member-mgt/member-mgt.service';
import { ItemMgtService } from '../../item-mgt/item-mgt.service';

@Component({
  selector: 'app-pre-order-detail',
  templateUrl: './pre-order-detail.component.html',
  styleUrls: ['./pre-order-detail.component.css']
})
export class PreOrderDetailComponent implements OnInit {

  private datePickerOptions: INgxMyDpOptions = {
    dateFormat: 'yyyy/mm/dd',
    selectorHeight: '290px',
    selectorWidth: '260px'
  };

  updateForm: FormGroup;
  // Data
  members;
  buildings;
  items;
  mealSets;
  private id: string;
  sale;
  // Modal Control
  ngMembersModal;
  ngBuildingsModal;
  ngItemsModal;
  ngMealSetsModal;
  // View Presenting Model
  selectedMember;
  selectedBuilding;
  selectedMeals = [];
  itemBeforeDiscount;
  mealSetBeforeDiscount;
  beforeDiscount;
  discountClick = 0;
  rewardPoint;
  discount;
  discountArray = [];
  fixedUnExchanged;
  fixedExchanged;
  storedDeliverDate;


  constructor(private _preorderService: PreorderService,
    private _memberMgtService: MemberMgtService,
    private _itemMgtService: ItemMgtService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this._preorderService.getSale(this.id).subscribe((sale) => {
      this.sale = sale[0];
      const parsedDate = {
        date: {
          year: Number(this.sale.deliverDateTime.substr(0, 4)),
          month: Number(this.sale.deliverDateTime.substr(5, 2)),
          day: Number(this.sale.deliverDateTime.substr(8, 2))
        }
      };

      this.storedDeliverDate = this.sale.deliverDateTime;
      this.discountClick = this.sale.buyerDiscount;
      console.log('Used Discount Ticked: ', this.sale.buyerDiscount);
      console.log('Business Member Point: ', this.sale.businessMemberPoint);

      this.updateForm = new FormGroup({
        'type': new FormControl(this.sale.type),
        'createDate': new FormControl(this.sale.createDate),
        'buyer': new FormControl(this.sale.buyer),
        'buyerName': new FormControl({ value: this.sale.buyerName, disabled: true }),
        'phone': new FormControl(this.sale.phone),
        'serveWay': new FormControl(this.sale.serveWay),
        'deliverDateTime': new FormControl(parsedDate),
        'deliverPeriod': new FormControl(this.sale.deliverPeriod),
        'deliverBuilding': new FormControl(this.sale.deliverBuilding),
        'deliverAddress': new FormControl(this.sale.deliverAddress),
        'orderedItems': new FormControl(this.sale.orderedItems),
        'orderedMealSets': new FormControl(this.sale.orderedMealSets),
        'tags': new FormControl(this.sale.tags),
        'total': new FormControl(this.sale.total),
        'note': new FormControl(this.sale.note),
        'beenDelivered': new FormControl(this.sale.beenDelivered),
        'lastUpdateDate': new FormControl(this.sale.lastUpdateDate),
        'marketingProgram': new FormControl(this.sale.marketingProgram),
        'buyerDiscount': new FormControl(this.sale.buyerDiscount),
        'businessMemberPoint': new FormControl(this.sale.businessMemberPoint)
      });

      // Setting View Present Model
      this.selectedMember = this.sale.buyer;

      // Restore RealDB storage
      this.updateForm.value.orderedItems.map((orderedItem) => {
        return orderedItem.titemId = orderedItem.itemId._id;
      });

      this.updateForm.value.orderedMealSets.map((orderedMealSet) => {
        return orderedMealSet.tmealSetId = orderedMealSet.mealSetId._id;
      });

      this._memberMgtService.getMembers().subscribe((members) => {
        this.members = members;
        if (this.updateForm.value.buyer) {
          this.selectedMember = this.members.filter((member) => {
            return member._id === this.updateForm.value.buyer._id;
          });
          this.selectedMember = this.selectedMember[0];
          // this.fixedUnExchanged = this.selectedMember.unExchanged - this.updateForm.value.total;
          this.fixedUnExchanged = this.selectedMember.unExchanged + 1000 * this.updateForm.value.buyerDiscount;
          this.fixedExchanged = this.selectedMember.exchanged + 1000 * this.updateForm.value.buyerDiscount;
          console.log('Pre-UN:', this.fixedUnExchanged);
          console.log('Pre-EX:', this.fixedExchanged);
          this.discount = Math.floor(this.fixedUnExchanged / 1000);
          for (let i = 0; i < this.discount; i++) {
            this.discountArray.push(100);
          }
        };
        console.log('CheckDisconutClicL' , this.discountClick);

          if (this.discountClick > 0) {
            this.calculateTotal(true);
          } else {
            this.calculateTotal(false);
          }
      });

      this._memberMgtService.getBuildings().subscribe((buildings) => {
      this.buildings = buildings;
      this.selectedBuilding = this.buildings.filter((building) => {
          return building._id === this.updateForm.value.deliverBuilding;
        });
        this.selectedBuilding = this.selectedBuilding[0];
      });

      

    });


    this._itemMgtService.getItems().subscribe((items) => {
      this.items = items;
    });

    this._itemMgtService.getMealsets().subscribe((mealSets) => {
      this.mealSets = mealSets;
    });

  } // end of ngOnint()

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

  updateOrder() {

    if (this.updateForm.value.deliverAddress && this.updateForm.value.deliverAddress !== this.selectedBuilding.address) {
      this.updateForm.patchValue({ deliverBuilding: '' });
    }

    this.updateForm.patchValue({ lastUpdateDate: moment().format() });

    if (this.updateForm.value.deliverDateTime.formatted) {
      this.updateForm.patchValue({ deliverDateTime: this.updateForm.value.deliverDateTime.formatted });
    }

    if (this.updateForm.value.deliverDateTime.date) {
      this.updateForm.patchValue({ deliverDateTime: this.storedDeliverDate });
    }

    console.log(this.updateForm.value);
    console.log(this.selectedMember);
  }

  deleteOrder() {

    const res = confirm('你正在刪除這筆訂單,你確定嗎?');

    if (res === true) {
      console.log(this.fixedUnExchanged);
      this.selectedMember.unExchanged = this.fixedUnExchanged - this.updateForm.value.businessMemberPoint - this.updateForm.value.total - 100 * this.discountClick;
      this.discountClick = 0;
      this.selectedMember.exchanged = this.fixedExchanged - (1000 * this.discountClick);
      console.log('BUG:', this.selectedMember);
      this._preorderService.deletePreorder(this.id).subscribe(
        (response) => {
          console.log(response);
          this._memberMgtService.updateMember(this.selectedMember._id, this.selectedMember).subscribe(
            (response02) => {
              console.log(response02);
            },
            (err) => {
              alert(err);
            },
            () => {
              console.log('[DATA] UPDATED MEMBER');
              alert('[DATA] UPDATED MEMBER');
              this.router.navigate(['../'], { relativeTo: this.route });
            }
          );
        },
        (err) => {
          alert(err);
        },
        () => {
          console.log('[DATA] DELETED ORDER');
          alert('[DATA] DELETED ORDER');
        }
      );
    } else {
      alert('不刪除訂單');
    }

  } // end of deleteOrder()

  onSelectedBuilding(building) {

    this.selectedBuilding = building;
    this.updateForm.patchValue({ deliverBuilding: building._id });
    this.updateForm.patchValue({ deliverAddress: building.address });
    this.closeBuildingsModal();

  }

  onSelectedItem(item) {

    // Real DB Producer
    if (this.updateForm.value.orderedItems.length > 0) {

      const tempOrderedItems = this.updateForm.value.orderedItems;

      const existedIndex = tempOrderedItems
        .map((existedItem) => {
          return existedItem.titemId;
        })
        .indexOf(item._id);

      if (existedIndex < 0) {

        this.updateForm.value.orderedItems.push({
          itemId: item,
          titemId: item._id,
          quantity: 1
        });

      } else {

        this.updateForm.value.orderedItems[existedIndex].quantity++;

      }

    } else {

      this.updateForm.value.orderedItems.push({
        itemId: item,
        titemId: item._id,
        quantity: 1
      });

    }

    if (this.discountClick > 0) {
      this.calculateTotal(true);
    } else {
      this.calculateTotal(false);
    }

  } // end of onSelectedItem()

  increaseSelectedItem(item) {

    const tempIncreaseItemArray = this.updateForm.value.orderedItems;

    const existedIncreasingItemIndex = tempIncreaseItemArray
      .map((increaseTargetItem) => {
        return increaseTargetItem.itemId._id;
      })
      .indexOf(item._id);

    if (existedIncreasingItemIndex >= 0) {
      this.updateForm.value.orderedItems[existedIncreasingItemIndex].quantity++;
    }

    if (this.discountClick > 0) {
      this.calculateTotal(true);
    } else {
      this.calculateTotal(false);
    }

  } // end of increaseSelectedItem()

  decreaseSelectedItem(item) {

    const tempIncreaseItemArray = this.updateForm.value.orderedItems;

    const existedIncreasingItemIndex = tempIncreaseItemArray
      .map((increaseTargetItem) => {
        return increaseTargetItem.itemId._id;
      })
      .indexOf(item._id);

    if (existedIncreasingItemIndex >= 0) {
      this.updateForm.value.orderedItems[existedIncreasingItemIndex].quantity--;
    }

    if (this.discountClick > 0) {
      this.calculateTotal(true);
    } else {
      this.calculateTotal(false);
    }

  } // end of increaseSelectedItem()


  onSelectedMealSet(mealSet) {

    // Real DB Producer
    if (this.updateForm.value.orderedMealSets.length > 0) {

      const tempOrdertedMealSets = this.updateForm.value.orderedMealSets;

      const existedMealSetIndex = tempOrdertedMealSets
        .map((existedMealSet) => {
          return existedMealSet.tmealSetId;
        })
        .indexOf(mealSet._id);

      if (existedMealSetIndex < 0) {

        this.updateForm.value.orderedMealSets.push({
          mealSetId: mealSet,
          tmealSetId: mealSet._id,
          quantity: 1
        });

      } else {

        this.updateForm.value.orderedMealSets[existedMealSetIndex].quantity++;

      }
    } else {

      this.updateForm.value.orderedMealSets.push({
        mealSetId: mealSet,
        tmealSetId: mealSet._id,
        quantity: 1
      });

    }

    if (this.discountClick > 0) {
      this.calculateTotal(true);
    } else {
      this.calculateTotal(false);
    }

  } // end of onSelectMealSet()

  increaseSelectedMealSet(mealSet) {

    const tempIncreaseMealSetArray = this.updateForm.value.orderedMealSets;

    const existedIncreasingMealSetIndex = tempIncreaseMealSetArray
      .map((increaseTargetItem) => {
        return increaseTargetItem.mealSetId._id;
      })
      .indexOf(mealSet._id);

    if (existedIncreasingMealSetIndex >= 0) {
      this.updateForm.value.orderedMealSets[existedIncreasingMealSetIndex].quantity++;
    }

    if (this.discountClick > 0) {
      this.calculateTotal(true);
    } else {
      this.calculateTotal(false);
    }

  } // end of increaseMealSet()

  decreaseSelectedMealSet(mealSet) {

    const tempIncreaseMealSetArray = this.updateForm.value.orderedMealSets;

    const existedIncreasingMealSetIndex = tempIncreaseMealSetArray
      .map((increaseTargetItem) => {
        return increaseTargetItem.mealSetId._id;
      })
      .indexOf(mealSet._id);

    if (existedIncreasingMealSetIndex >= 0) {
      this.updateForm.value.orderedMealSets[existedIncreasingMealSetIndex].quantity--;
    }

    if (this.discountClick > 0) {
      this.calculateTotal(true);
    } else {
      this.calculateTotal(false);
    }

  }

  removeItem(item) {

    const tempRemoveItemTarget = this.updateForm.value.orderedItems;

    const removeRealItemIndex = tempRemoveItemTarget
      .map((removeTargetItem) => {
        return removeTargetItem.itemId._id;
      })
      .indexOf(item._id);

    if (removeRealItemIndex > -1) {
      this.updateForm.value.orderedItems.splice(removeRealItemIndex, 1);
    }

    if (this.discountClick > 0) {
      this.calculateTotal(true);
    } else {
      this.calculateTotal(false);
    }

  }

  removeMealSet(mealSet) {

    const tempRemoveMealSetTarget = this.updateForm.value.orderedMealSets;

    const removeRealMealSetIndex = tempRemoveMealSetTarget
      .map((removeTargetMealSet) => {
        return removeTargetMealSet.mealSetId._id;
      })
      .indexOf(mealSet._id);

    if (removeRealMealSetIndex > -1) {
      this.updateForm.value.orderedMealSets.splice(removeRealMealSetIndex, 1);
    }

    if (this.discountClick > 0) {
      this.calculateTotal(true);
    } else {
      this.calculateTotal(false);
    }

  }


  calculateTotal(discount) {

    if (discount) {

      // Calculate Total After Disount
      const beforeDiscountItems = this.updateForm.value.orderedItems.reduce((total, orderedItem) => {
        return total + orderedItem.itemId.price * orderedItem.quantity;
      }, 0);

      const beforeDiscountMealSets = this.updateForm.value.orderedMealSets.reduce((total, orderedMealSet) => {
        return total + orderedMealSet.mealSetId.price * orderedMealSet.quantity;
      }, 0);

      this.beforeDiscount = beforeDiscountItems + beforeDiscountMealSets;
      const afterDiscount = this.beforeDiscount - 100 * this.discountClick;
      console.log(afterDiscount);

      // Case 1. Business Member Purchase More Than 1,000
      if (this.selectedMember &&
          afterDiscount >= 1000 &&
          this.selectedMember.type === 'business' &&
          this.updateForm.value.total >= 0) {

        console.log('Super Customer01');

        // Processing Total (After Discount)
        this.updateForm.patchValue({total: afterDiscount});
        // Processing Reward Point (Exchanged & UnExchanged)
        this.selectedMember.unExchanged = this.fixedUnExchanged - this.sale.total + afterDiscount;
        this.selectedMember.exchanged = this.fixedExchanged + 1000 * this.discountClick;
        // Business Member Extra Bounus
        this.rewardPoint = 100;
        this.updateForm.patchValue({businessMemberPoint : this.rewardPoint });
        this.selectedMember.unExchanged += 100;

      // Case 2. Business / Individual Member Normal
      } else if (this.selectedMember &&
                 this.selectedMember.type === 'business' ||
                 this.selectedMember.type === 'individual' &&
                 this.updateForm.value.total >= 0) {

        // Processing Reward Point (Exchanged & UnExchanged)
        this.selectedMember.unExchanged = this.fixedUnExchanged + afterDiscount;
        this.selectedMember.exchanged = this.fixedExchanged + 1000 * this.discountClick;
        // Processing Total (After Discount)
        this.updateForm.patchValue({total: afterDiscount});

        if (this.rewardPoint) {
          this.rewardPoint = null;
        }

      // Case Exception . Total is already under 0
      } else {
        alert('無法繼續使用折價卷');
      }

    } else {

      // Calculate Total Before Discount

      const beforeDiscountItems = this.updateForm.value.orderedItems.reduce((total, orderedItem) => {
        return total + orderedItem.itemId.price * orderedItem.quantity;
      }, 0);

      const beforeDiscountMealSets = this.updateForm.value.orderedMealSets.reduce((total, orderedMealSet) => {
        return total + orderedMealSet.mealSetId.price * orderedMealSet.quantity;
      }, 0);

      this.beforeDiscount = beforeDiscountItems + beforeDiscountMealSets;

      // Case 1. Business Member Purchase More Than 1,000
      if (this.selectedMember && this.beforeDiscount >= 1000 && this.selectedMember.type === 'business') {

        console.log('SUPER CUSTOMER02');

        this.selectedMember.unExchanged = this.fixedUnExchanged - this.sale.total + this.beforeDiscount;
        this.selectedMember.unExchanged += 100;
        this.rewardPoint = 100;
        this.updateForm.patchValue({businessMemberPoint : this.rewardPoint });
        this.updateForm.patchValue({ total: this.beforeDiscount });
      // Case 2. Business / Individual Member Normal
      } else if (this.selectedMember && this.selectedMember.type === 'individual' || this.selectedMember.type === 'business') {

        this.updateForm.patchValue({ total: this.beforeDiscount });
        this.selectedMember.unExchanged = this.fixedUnExchanged + this.beforeDiscount;

        if (this.rewardPoint) {
          this.rewardPoint = null;
        }

      // Case Exception . Total is already under 0
      } else {

        this.updateForm.patchValue({ total: this.beforeDiscount });

        if (this.rewardPoint) {
          this.rewardPoint = null;
        }


      }

    } // end of Before Discount


  } // end of calculateTotal()

  onExchanging() {

    if (this.updateForm.value.total === 0) {
      alert('無消費');
    } else {
      this.discountClick++;
      this.updateForm.patchValue({buyerDiscount: this.discountClick });
      console.log(this.updateForm.value.buyerDiscount);
      this.calculateTotal(true);
      this.discountArray.pop();
      const progrmaticNote = this.updateForm.value.note.concat('\n[已使用一張折價券]');
      this.updateForm.patchValue({ note: progrmaticNote });
    }

  }



}
