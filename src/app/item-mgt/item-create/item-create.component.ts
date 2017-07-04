import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  public selectedIngredient;
  public mainIngredients;
  createForm: FormGroup;
  ngModal;


  constructor( private _itemMgtService: ItemMgtService,
               private _accountingService: AccountingService,
               private router: Router,
               private route: ActivatedRoute ) { }

  ngOnInit() {

    this.ngModal = false;

    this._accountingService.getMainIngredients().subscribe((mainIngredients) => {
      this.mainIngredients = mainIngredients;
    });

    this.createForm = new FormGroup({
      'category': new FormControl(''),
      'name': new FormControl(''),
      'barcode': new FormControl(''),
      'price': new FormControl(0),
      'unit': new FormControl(''),
      'image': new FormControl(''),
      'calorie': new FormControl(0),
      'ingredient': new FormControl(''),
      'description': new FormControl(''),
      'active': new FormControl(),
    });

  }

  createItem() {

    console.log('Creating....', this.createForm.value);
    this._itemMgtService.createItem(this.createForm.value).subscribe(
      (data) => {
        console.log('NEXT: ', data);
      },
      (error) => {
        alert(error);
      },
      () => {
        alert('Completed');
        this.router.navigate(['../items'], { relativeTo: this.route });
      }
    );

  }

  goBack() {
    this.router.navigate(['../items'], { relativeTo: this.route });
  }

  ingredientSelected(input: any) {

    this.createForm.value.ingredient = input._id;
    console.log('Selected ', this.createForm.value);
    this.selectedIngredient = input.subjectName;
    this.ngModal = false;

  }

  selectingIngredient() {
    this.ngModal = true;
  }

  closeModal() {
    this.ngModal = false;
  }

}
