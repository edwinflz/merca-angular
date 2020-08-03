import { Component, OnInit, Input } from '@angular/core';
import { Shopper } from '@core/models/shopper-interface';
import { ProfileService } from '@core/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() shopper: Shopper;
  spinner = 'assets/img/spinner.gif';
  url: string;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    if (this.shopper) {
      this.url = this.profileService.getUrlImage(this.shopper.perfil);
    }
    console.log(this.shopper);
    console.log(this.url);
  }

}
