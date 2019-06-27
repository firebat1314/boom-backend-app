import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountPage } from './count.page';

describe('CountPage', () => {
  let component: CountPage;
  let fixture: ComponentFixture<CountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
