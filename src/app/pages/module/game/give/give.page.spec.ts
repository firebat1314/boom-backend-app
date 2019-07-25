import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GivePage } from './give.page';

describe('GivePage', () => {
  let component: GivePage;
  let fixture: ComponentFixture<GivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GivePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
