import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskexchgPage } from './riskexchg.page';

describe('RiskexchgPage', () => {
  let component: RiskexchgPage;
  let fixture: ComponentFixture<RiskexchgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskexchgPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskexchgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
