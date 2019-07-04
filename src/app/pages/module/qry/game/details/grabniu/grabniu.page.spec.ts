import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrabniuPage } from './grabniu.page';

describe('GrabniuPage', () => {
  let component: GrabniuPage;
  let fixture: ComponentFixture<GrabniuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrabniuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrabniuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
