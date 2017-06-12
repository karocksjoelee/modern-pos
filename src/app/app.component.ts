import { Component, OnInit, OnDestroy } from '@angular/core';
import { RealTimeService } from './realtime.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Angular App Works !';
  messages = [];
  connection;
  message;

  constructor(private realTimeService: RealTimeService) { }

  ngOnInit() {

    // this.connection = this.realTimeService.getMessages().subscribe((message) => {
    //   this.messages.push(message);
    // });

  }

  sendMessage() {
    this.realTimeService.sendMessage(this.message);
    this.message = '';
  }

  ngOnDestroy() {

    this.connection.unsubscribe();

  }
}
