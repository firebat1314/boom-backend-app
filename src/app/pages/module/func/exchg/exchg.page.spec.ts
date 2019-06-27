import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchgPage } from './exchg.page';

describe('ExchgPage', () => {
  let component: ExchgPage;
  let fixture: ComponentFixture<ExchgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchgPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
