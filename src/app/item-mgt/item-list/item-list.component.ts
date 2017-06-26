import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { ItemMgtService } from '../item-mgt.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items;

  constructor(private _itemMgtService: ItemMgtService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit() {

    this.items = this._itemMgtService.getItems();
    console.log(this.items);

  }

  createItem() {
    this.router.navigate(['/dashboard/items/new-item'], { relativeTo: this.route } );
  }

}
