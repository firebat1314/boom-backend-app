import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeepPage } from './keep.page';

describe('KeepPage', () => {
  let component: KeepPage;
  let fixture: ComponentFixture<KeepPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeepPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeepPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
