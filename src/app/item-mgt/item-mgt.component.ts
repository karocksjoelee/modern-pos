import { Component, OnInit } from '@angular/core';
import { ItemMgtService } from './item-mgt.service';

@Component({
  selector: 'app-item-mgt',
  templateUrl: './item-mgt.component.html',
  styleUrls: ['./item-mgt.component.css']
})
export class ItemMgtComponent implements OnInit {

  actived;

  constructor( ) { }

  ngOnInit() {

    this.actived = 'itemActived';

  } // end of ngOnInit()


}
