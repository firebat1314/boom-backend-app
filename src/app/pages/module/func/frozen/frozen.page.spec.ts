import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrozenPage } from './frozen.page';

describe('FrozenPage', () => {
  let component: FrozenPage;
  let fixture: ComponentFixture<FrozenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrozenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrozenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
