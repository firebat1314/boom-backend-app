import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchargePage } from './scharge.page';

describe('SchargePage', () => {
  let component: SchargePage;
  let fixture: ComponentFixture<SchargePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchargePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchargePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
