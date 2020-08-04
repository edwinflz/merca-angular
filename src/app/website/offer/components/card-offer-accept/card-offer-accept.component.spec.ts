import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOfferAcceptComponent } from './card-offer-accept.component';

describe('CardOfferAcceptComponent', () => {
  let component: CardOfferAcceptComponent;
  let fixture: ComponentFixture<CardOfferAcceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardOfferAcceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOfferAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
