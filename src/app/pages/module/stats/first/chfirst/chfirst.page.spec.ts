import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChfirstPage } from './chfirst.page';

describe('ChfirstPage', () => {
  let component: ChfirstPage;
  let fixture: ComponentFixture<ChfirstPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChfirstPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChfirstPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
