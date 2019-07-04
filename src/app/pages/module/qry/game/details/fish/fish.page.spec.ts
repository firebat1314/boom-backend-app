import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FishPage } from './fish.page';

describe('FishPage', () => {
  let component: FishPage;
  let fixture: ComponentFixture<FishPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FishPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
