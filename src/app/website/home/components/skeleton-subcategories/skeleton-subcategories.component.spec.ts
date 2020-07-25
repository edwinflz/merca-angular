import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonSubcategoriesComponent } from './skeleton-subcategories.component';

describe('SkeletonSubcategoriesComponent', () => {
  let component: SkeletonSubcategoriesComponent;
  let fixture: ComponentFixture<SkeletonSubcategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkeletonSubcategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonSubcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
