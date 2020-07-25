import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSubcategoriesComponent } from './dialog-subcategories.component';

describe('DialogSubcategoriesComponent', () => {
  let component: DialogSubcategoriesComponent;
  let fixture: ComponentFixture<DialogSubcategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSubcategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSubcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
