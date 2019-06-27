import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldChgRankPage } from './gold-chg-rank.page';

describe('GoldChgRankPage', () => {
  let component: GoldChgRankPage;
  let fixture: ComponentFixture<GoldChgRankPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoldChgRankPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldChgRankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
