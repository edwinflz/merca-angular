import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OfferService } from '@core/services/offer/offer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OfferDetailShopper } from '@core/models/offer-detail-shopper.interface';
import { MessageServer } from '@core/models/message-server.interface';
import { DialogConfirmationComponent } from '../../components/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-detail-offer',
  templateUrl: './detail-offer.component.html',
  styleUrls: ['./detail-offer.component.scss']
})
export class DetailOfferComponent implements OnInit {

  showPrice: boolean;
  offerId: string;
  orderId: string;
  offerDetail: OfferDetailShopper;
  errors: string[] = [];
  registerSuccess: string;

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private offerService: OfferService,
    private load: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showPrice = false;
    this.tryOfferId();
  }

  tryOfferId(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.offerId = params.id;
      this.orderId = params.orderId;
      // tslint:disable-next-line: radix
      this.fetchOffer(parseInt(this.offerId));
    });
  }

  fetchOffer(id: number): void {
    this.load.show();
    this.offerService.getOfferDetailShopper(id).subscribe(offer => {
      this.offerDetail = offer;
      this.load.hide();
    }, errors => this.load.hide());
  }

  showPriceTable(): void {
    this.showPrice = !this.showPrice;
  }

  openDialog(action: string, offerId: number, orderId: number): void {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        action
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Delete') {
        this.offerCancel(offerId);
      }

      if (result.event === 'Accept' || result.event === 'Create') {
        this.offerAccept(result.event, offerId, orderId);
      }
    });

  }

  offerAccept(action: string, offerId: number, orderId: number): void {
    this.load.show();
    this.offerService.offerAccept(offerId, orderId).subscribe((result: MessageServer) => {
      this.load.hide();
      if (result.status === 500) {
        this.pushError(result.error);
      } else {
        this.registerSuccess = result.exito;
        if (action === 'Accept') {
          this.router.navigate(['shopper/offer']);
        } else {
          this.router.navigate(['shopper/order', this.offerDetail.subcategoryId, this.offerDetail.businessId]);
        }
      }
    }, errors => this.load.hide());
  }

  offerCancel(id: number): void {
    this.load.show();
    this.offerService.offerCancel(id).subscribe((result: MessageServer) => {
      this.load.hide();
      if (result.status === 500) {
        this.pushError(result.error);
      } else {
        this.registerSuccess = result.exito;
        this.router.navigate(['shopper/offer']);
      }
    }, errors => this.load.hide());
  }

  pushError(msg: string): void {
    this.errors.push(msg);
  }

}
