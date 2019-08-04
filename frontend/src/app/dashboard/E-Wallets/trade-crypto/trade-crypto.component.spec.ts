import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeCryptoComponent } from './trade-crypto.component';

describe('TradeCryptoComponent', () => {
  let component: TradeCryptoComponent;
  let fixture: ComponentFixture<TradeCryptoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeCryptoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
