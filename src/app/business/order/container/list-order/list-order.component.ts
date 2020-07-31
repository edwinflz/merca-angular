import { Component, OnInit } from '@angular/core';
import { BusinessService } from '@core/services/business/business.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

  constructor(
    private router: Router,
    private businessService: BusinessService,
  ) { }

  ngOnInit(): void {
    this.checkUser();
  }

  checkUser(): void {
    this.businessService.userHasProfileSalesman().subscribe((data: any) => {
      if (data.status === 404) {
        this.router.navigate(['business/salesman/account']);
      } else {
        // this.router.navigate(['business/salesman/order']);
      }
    });
  }

}
