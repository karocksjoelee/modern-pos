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
  rewardPoint;
  discount;
  discountArray = [];
  fixedUnExchanged;

  constructor(private _preorderService: PreorderService,
              private _memberMgtService: MemberMgtService,
              private _itemMgtService: ItemMgtService,
              private router: Router,
              private route: ActivatedRoute) {


    this.createForm = new FormGroup({
      // 'type': new FormControl('pre-order'),
      'type': new FormControl(''),
      'createDate': new FormControl(''),
      'buyer': new FormControl(),
      'buyerName': new FormControl(''),
      'phone': new FormControl(''),
      'serveWay': new FormControl(''),
      'deliverDateTime': new FormControl(''),
      'deliverPeriod': new FormControl(''),
      'deliverBuilding': new FormControl(),
      'deliverAddress': new FormControl(''),
      'orderedItems': new FormControl([]),
      'orderedMealSets': new FormControl([]),
      'tags': new FormControl(''),
      'total': new FormControl(''),
      'note': new FormControl(''),
      'weather': new FormControl(''),
      'tempture': new FormControl(''),
      'beenDelivered': new FormControl(false),
      'lastUpdateDate': new FormControl(''),
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


  newOrder() {

    if (this.selectedBuilding) {

      if (this.createForm.value.deliverAddress !== this.selectedBuilding.address) {

        this.createForm.patchValue({ deliverBuilding: null });

      }

    }

    if (this.createForm.value.deliverDateTime === '') {
      alert ('請選擇預訂日期');
      return;
    }

    if (this.rewardPoint) {
      this.createForm.patchValue({businessMemberPoint: this.rewardPoint });
    }

    this.createForm.patchValue({createDate: moment()});
    this.createForm.patchValue({buyerDiscount: this.discountClick });

    if (this.createForm.value.deliverDateTime.formatted) {
      this.createForm.patchValue({deliverDateTime: this.createForm.value.deliverDateTime.formatted});
    }

    // Processing Human Identiable code 
    const humanIdentifyCode = `${this.createForm.value.deliverDateTime.replace('/', '').replace('/', '')}:${Math.floor(Math.random() * 9999) + 1}`;
    this.createForm.patchValue({orderCode: humanIdentifyCode });

    console.log(this.createForm.value);

    this._preorderService.createSale(this.createForm.value).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        alert(error);
      },
      () => {
        alert('Completed');
        this.router.navigate(['../preorders'], { relativeTo: this.route });
      }
    );
    if (this.selectedMember) {
      console.log('Sending PUT Member ');
      this._memberMgtService.updateMember(this.selectedMember._id, this.selectedMember).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          alert(error);
        },
        () => {
          alert('Completed 2');
        }
      );
    }

  } // end of newOrder()

  onSelectedMember(member) {

    this.discountArray = [];
    this.selectedMember = member;
    this.createForm.patchValue({ buyer: member._id });
    this.createForm.patchValue({ buyerName: member.name });
    this.createForm.patchValue({ note: ''} );
    this.createForm.patchValue({ phone: member.phone });
    this.fixedUnExchanged = this.selectedMember.unExchanged;
    this.discount = Math.floor(this.selectedMember.unExchanged / 1000);

    for (let i = 0; i < this.discount; i++) {
      this.discountArray.push(100);
    }

    if (this.discountClick > 0) {
      this.discountClick = null;
    }

    this.calculateTotal(false);
    this.closeMembersModal();

  }


  onSelectedBuilding(building) {

    this.selectedBuilding = building;
    this.createForm.patchValue({ deliverBuilding: building._id });
    this.createForm.patchValue({ deliverAddress: building.address });
    this.closeBuildingsModal();

  }


  onSelectedItem(item) {

    // Real DB Producer
    if (this.createForm.value.orderedItems.length > 0) {

      const tempOrderedItems = this.createForm.value.orderedItems;

      const existedIndex = tempOrderedItems
        .map((existedItem) => {
          return existedItem.itemId;
        })
        .indexOf(item._id);

      if (existedIndex < 0) {

        this.createForm.value.orderedItems.push({
          itemId: item._id,
          quantity: 1
        });

      } else {

        this.createForm.value.orderedItems[existedIndex].quantity++;

      }

    } else {

      this.createForm.value.orderedItems.push({
        itemId: item._id,
        quantity: 1
      });

    }


    // View Presenting Model
    if (this.selectedMeals.length > 0) {

      const tempSelectedMealId = this.selectedMeals;

      const existedMealIndex = tempSelectedMealId
        .map((existedMeal) => {
          return existedMeal.meal._id;
        })
        .indexOf((item._id));

      if (existedMealIndex < 0) {
        this.selectedMeals.push({
          meal: item,
          quantity: 1
        });
      } else {
        this.selectedMeals[existedMealIndex].quantity++;
      }

    } else {

      this.selectedMeals.push({
        meal: item,
        quantity: 1
      });

    }

    if (this.discountClick) {
      this.calculateTotal(true);
    } else {
      this.calculateTotal(false);
    }

  } // end of onSelectedItem()

  onSelectedMealSet(mealSet) {

    // Real DB Producer
    if (this.createForm.value.orderedMealSets.length > 0) {

      const tempOrdertedMealSets = this.createForm.value.orderedMealSets;

      const existedMealSetIndex = tempOrdertedMealSets
        .map((existedMealSet) => {
          return existedMealSet.mealSetId;
        })
        .indexOf(mealSet._id);

      if (existedMealSetIndex < 0) {

        this.createForm.value.orderedMealSets.push({
          mealSetId: mealSet._id,
          quantity: 1
        });

      } else {

        this.createForm.value.orderedMealSets[existedMealSetIndex].quantity++;

      }
    } else {

      this.createForm.value.orderedMealSets.push({
        mealSetId: mealSet._id,
        quantity: 1
      });

    }

    // View Presenting Model
    if (this.selectedMeals.length > 0) {

      const tempSelectedMealId = this.selectedMeals;

      const existedMealIndex = tempSelectedMealId
        .map((existedMeal) => {
          return existedMeal.meal._id;
        })
        .indexOf((mealSet._id));

      if (existedMealIndex < 0) {

        this.selectedMeals.push({
          meal: mealSet,
          quantity: 1
        });

      } else {

        this.selectedMeals[existedMealIndex].quantity++;

      }

    } else {

      this.selectedMeals.push({
        meal: mealSet,
        quantity: 1
      });

    }

    if (this.discountClick) {
      this.calculateTotal(true);
    } else {
      this.calculateTotal(false);
    }

  } // end of onSelectMealSet()

  calculateTotal(discount) {

    if (discount) {

      // Calculate Total After Disount

      this.beforeDiscount = this.selectedMeals.reduce((total, selectedMeal) => {
        return total + selectedMeal.meal.price * selectedMeal.quantity;
      }, 0);

      const afterDiscount = this.beforeDiscount - 100 * this.discountClick;
      console.log(afterDiscount);

      // Case 1. Business Member Purchase More Than 1,000
      if (this.selectedMember &&
          afterDiscount >= 1000 &&
          this.selectedMember.type === 'business' &&
          this.createForm.value.total >= 0) {

        console.log('Super Customer');

        // Processing Total (After Discount)
        this.createForm.patchValue({total: afterDiscount});
        // Processing Reward Point (Exchanged & UnExchanged)
        this.selectedMember.unExchanged = this.fixedUnExchanged + afterDiscount;
        this.selectedMember.unExchanged -= 1000 * this.discountClick;
        this.selectedMember.exchanged += 1000 * this.discountClick;
        // Business Member Extra Bounus
        this.rewardPoint = 100;
        this.createForm.patchValue({businessMemberPoint : this.rewardPoint });
        this.selectedMember.unExchanged += 100;

      // Case 2. Business / Individual Member Normal
      } else if (this.selectedMember &&
                 this.selectedMember.type === 'business' ||
                 this.selectedMember.type === 'individual' &&
                 this.createForm.value.total >= 0) {

        // Processing Total (After Discount)
        this.createForm.patchValue({total: afterDiscount});
        // Processing Reward Point (Exchanged & UnExchanged)
        this.selectedMember.unExchanged = this.fixedUnExchanged + afterDiscount;
        this.selectedMember.unExchanged -= 1000 * this.discountClick;
        this.selectedMember.exchanged += 1000 * this.discountClick;

        if (this.rewardPoint) {
          this.rewardPoint = null;
        }

      // Case Exception . Total is already under 0
      } else {
        alert('無法繼續使用折價卷');
      }

    } else {

      // Calculate Total Before Discount

      this.beforeDiscount = this.selectedMeals.reduce((total, selectedMeal) => {
        return total + selectedMeal.meal.price * selectedMeal.quantity;
      }, 0);

      // Case 1. Business Member Purchase More Than 1,000
      if (this.selectedMember && this.beforeDiscount >= 1000 && this.selectedMember.type === 'business') {

        console.log('SUPER CUSTOMER');

        this.createForm.patchValue({ total: this.beforeDiscount });
        this.rewardPoint = 100;
        this.createForm.patchValue({businessMemberPoint : this.rewardPoint });
        this.selectedMember.unExchanged = this.fixedUnExchanged + this.beforeDiscount;
        this.selectedMember.unExchanged += 100;

      // Case 2. Business / Individual Member Normal
      } else if (this.selectedMember.type && this.selectedMember.type === 'individual' || this.selectedMember.type === 'business') {

        this.createForm.patchValue({ total: this.beforeDiscount });
        console.log('HEE TEST');
        this.selectedMember.unExchanged = this.fixedUnExchanged + this.beforeDiscount;

        if (this.rewardPoint) {
          this.rewardPoint = null;
        }

      // Case Exception . Total is already under 0
      } else {

        this.createForm.patchValue({ total: this.beforeDiscount });

        if (this.rewardPoint) {
          this.rewardPoint = null;
        }


      }

    } // end of Before Discount


  } // end of calculateTotal()

  clearMember() {

    this.createForm.patchValue({ buyer: null });
    this.createForm.patchValue({ buyerName: '' });
    this.createForm.patchValue({note: ''});
    this.calculateTotal(false);
    this.selectedMember = null;

    if (this.discountClick > 0) {
      this.discountClick = null;
    }

  } // end of clearMember()

  increaseQuantity(meal) {

    // Real DB Producer

    const tempIncreaseItemArray = this.createForm.value.orderedItems;

    const existedIncreasingItemIndex = tempIncreaseItemArray
      .map((increaseTargetItem) => {
        return increaseTargetItem.itemId;
      })
      .indexOf(meal.meal._id);

    if ( existedIncreasingItemIndex >= 0) {
      this.createForm.value.orderedItems[existedIncreasingItemIndex].quantity++;
    }

    const tempIncreaseMealSetArray = this.createForm.value.orderedMealSets;

    const existedIncreasingMealSetIndex = tempIncreaseMealSetArray
      .map((increaseTargetMealSet) => {
        return increaseTargetMealSet.mealSetId;
      })
      .indexOf(meal.meal._id);

    if ( existedIncreasingMealSetIndex >= 0) {
      this.createForm.value.orderedMealSets[existedIncreasingMealSetIndex].quantity++;
    }


    // View Presenting Model
    const tempIncreaseMeal = this.selectedMeals;

    const increaseTargetMealIndex = tempIncreaseMeal
      .map((increaseTargetMeal) => {
        return increaseTargetMeal.meal._id;
      })
      .indexOf((meal.meal._id));

    this.selectedMeals[increaseTargetMealIndex].quantity++;

    if (this.discountClick) {
      this.calculateTotal(true);
    } else {
      this.calculateTotal(false);
    }

  } // end of increaseQuantity()

  decreaseQuantity(meal) {

    // Real DB Producer

    const tempDecreaseItemArray = this.createForm.value.orderedItems;

    const existedDecreasingItemIndex = tempDecreaseItemArray
      .map((decreaseTargetItem) => {
        return decreaseTargetItem.itemId;
      })
      .indexOf(meal.meal._id);

    if ( existedDecreasingItemIndex >= 0) {
      this.createForm.value.orderedItems[existedDecreasingItemIndex].quantity--;
    }

    // View Presenting Model

    const tempIncreaseMealSetArray = this.createForm.value.orderedMealSets;

    const existedIncreasingMealSetIndex = tempIncreaseMealSetArray
      .map((increaseTargetMealSet) => {
        return increaseTargetMealSet.mealSetId;
      })
      .indexOf(meal.meal._id);

    if ( existedIncreasingMealSetIndex >= 0) {
      this.createForm.value.orderedMealSets[existedIncreasingMealSetIndex].quantity--;
    }


    // View Presenting Model

    const tempDecreaseMeal = this.selectedMeals;

    const decreaseTargetMealIndex = tempDecreaseMeal
      .map((decreaseTargetMeal) => {
        return decreaseTargetMeal.meal._id;
      })
      .indexOf((meal.meal._id));


    if (this.selectedMeals[decreaseTargetMealIndex].quantity > 1) {

      this.selectedMeals[decreaseTargetMealIndex].quantity--;

    } else {

      this.removeMeal(meal);

    }

    if (this.discountClick) {
      this.calculateTotal(true);
    } else {
      this.calculateTotal(false);
    }

  } // end of decreaseQuantity()

  removeMeal(meal) {

    // Real DB Producer

    const tempRemoveItemTarget = this.createForm.value.orderedItems;
    const tempRemoveMealSetTarget = this.createForm.value.orderedMealSets;

    const removeRealItemIndex = tempRemoveItemTarget
                                    .map((item) => {
                                      return item.itemId;
                                    })
                                    .indexOf(meal.meal._id);

    if (removeRealItemIndex > -1 ) {
      this.createForm.value.orderedItems.splice(removeRealItemIndex, 1);
    }

    const removeRealMealSetTargetIndex = tempRemoveMealSetTarget
                                            .map((mealSet) => {
                                              return mealSet.mealSetId;
                                            })
                                            .indexOf(meal.meal._id);

    if (removeRealMealSetTargetIndex > -1 ) {
      this.createForm.value.orderedMealSets.splice(removeRealMealSetTargetIndex, 1);
    }

    // View Presenting Model

    const tempRemoveMeal = this.selectedMeals;

    const removeTargetMealIndex = tempRemoveMeal
      .map((removeTargetMeal) => {
        return removeTargetMeal.meal._id;
      })
      .indexOf((meal.meal._id));

    this.selectedMeals.splice(removeTargetMealIndex, 1);

    if (this.discountClick) {
      this.calculateTotal(true);
    } else {
      this.calculateTotal(false);
    }

  } // end of removeMeal()

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

  onExchanging() {

    if (this.createForm.value.total === 0) {
      alert('無消費');
    } else {
      this.discountClick++;
      this.calculateTotal(true);
      this.discountArray.pop();
      const progrmaticNote = this.createForm.value.note.concat('\n[已使用一張折價券]');
      this.createForm.patchValue({note: progrmaticNote});
    }

  }

}
