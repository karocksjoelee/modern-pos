import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  id;
  updateForm = new FormGroup({});

  constructor(private _itemMgtService: ItemMgtService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];

    this._itemMgtService.getItemById(this.id).subscribe((item) => {

        this.item = item[0];

        this.updateForm = new FormGroup({
          'category': new FormControl(item[0].category),
          'name': new FormControl(item[0].name),
          'barcode': new FormControl(item[0].barcode),
          'price': new FormControl(item[0].price),
          'unit': new FormControl(item[0].unit),
          'image': new FormControl(item[0].image),
          'calorie': new FormControl(item[0].calorie),
          'ingredient': new FormControl(item[0].ingredient || ''),
          'description': new FormControl(item[0].description),
          'active': new FormControl(item[0].active)
        });

      });

  }

  updateItem() {

    console.log(this.updateForm.value);
    this._itemMgtService.updateItem(this.item._id, this.updateForm.value).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        alert(error);
      },
      () => {
        console.log('Completed');
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {

  }

}
