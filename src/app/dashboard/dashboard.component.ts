import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private nativeElement: Node;
  private toggle: Boolean = true;

  constructor() { }

  ngOnInit() {

  }

  sidebarToggle() {
    this.toggle = !this.toggle;
  }




}
