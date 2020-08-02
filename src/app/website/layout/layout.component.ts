import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { TokenService } from '@core/services/tokens/token.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  mode = new FormControl('over');
  nameUser = 'Invitado';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private tokenService: TokenService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.nameUser = this.tokenService.getName();
  }

  redirectlogin(): void {
    this.router.navigate(['logout', 1]);
  }

}
