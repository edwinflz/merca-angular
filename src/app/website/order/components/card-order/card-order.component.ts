import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderShopper } from '@core/models/orders-shopper.interface';

@Component({
  selector: 'app-card-order',
  templateUrl: './card-order.component.html',
  styleUrls: ['./card-order.component.scss']
})
export class CardOrderComponent implements OnInit {

  @Input() order: OrderShopper;
  @Input() index: number;
  @Output() sendIdOrder: EventEmitter<any> = new EventEmitter();


  spinner = 'assets/img/spinner.gif';

  constructor() { }

  ngOnInit(): void {
  }

  sendRequestOrder(id: number): void {
    this.sendIdOrder.emit(id);
  }

}
