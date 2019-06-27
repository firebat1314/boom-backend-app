import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatePage } from './operate.page';

describe('OperatePage', () => {
  let component: OperatePage;
  let fixture: ComponentFixture<OperatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
