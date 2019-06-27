import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChDataPage } from './ch-data.page';

describe('ChDataPage', () => {
  let component: ChDataPage;
  let fixture: ComponentFixture<ChDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChDataPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
