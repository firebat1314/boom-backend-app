import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaoPage } from './bao.page';

describe('BaoPage', () => {
  let component: BaoPage;
  let fixture: ComponentFixture<BaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
