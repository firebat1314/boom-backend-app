import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvPage } from './adv.page';

describe('AdvPage', () => {
  let component: AdvPage;
  let fixture: ComponentFixture<AdvPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
