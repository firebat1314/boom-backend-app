import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordsPage } from './landlords.page';

describe('LandlordsPage', () => {
  let component: LandlordsPage;
  let fixture: ComponentFixture<LandlordsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandlordsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandlordsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
