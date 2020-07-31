import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogListOrderComponent } from './dialog-list-order.component';

describe('DialogListOrderComponent', () => {
  let component: DialogListOrderComponent;
  let fixture: ComponentFixture<DialogListOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogListOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogListOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
