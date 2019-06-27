import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoomconfigPage } from './boomconfig.page';

describe('BoomconfigPage', () => {
  let component: BoomconfigPage;
  let fixture: ComponentFixture<BoomconfigPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoomconfigPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoomconfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
