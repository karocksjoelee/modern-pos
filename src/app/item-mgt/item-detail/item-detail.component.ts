import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemMgtService } from '../item-mgt.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit, OnDestroy {

  private sub: any;
  public item: any;
  editForm: FormGroup;


  constructor(private _itemMgtService: ItemMgtService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe((params) => {
      this.item = this._itemMgtService.getItemById(params['id']);
      this.editForm = new FormGroup({
        'category': new FormControl({value : this.item[0].category, disabled: true }),
        'name': new FormControl({value : this.item[0].name, disabled: true }),
        'barcode': new FormControl({value : this.item[0].barCode, disabled: true }),
        'price': new FormControl(this.item[0].price),
        'unit': new FormControl({value : this.item[0].unit, disabled: true }),
        'image': new FormControl(''),
        'calorie': new FormControl(this.item[0].calorie),
        'ingredient': new FormControl(this.item[0].ingredient),
        'description': new FormControl(this.item[0].description),
        'active': new FormControl(this.item[0].active)
      });
    });

  }

  updateItem() {
    console.log(this.editForm.value);
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {

  }

}
