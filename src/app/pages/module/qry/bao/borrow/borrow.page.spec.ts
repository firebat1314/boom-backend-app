import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowPage } from './borrow.page';

describe('BorrowPage', () => {
  let component: BorrowPage;
  let fixture: ComponentFixture<BorrowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
