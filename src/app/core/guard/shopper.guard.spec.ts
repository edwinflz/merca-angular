import { TestBed } from '@angular/core/testing';

import { ShopperGuard } from './shopper.guard';

describe('ShopperGuard', () => {
  let guard: ShopperGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ShopperGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
