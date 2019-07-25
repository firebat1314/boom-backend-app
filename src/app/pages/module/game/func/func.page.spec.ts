import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncPage } from './func.page';

describe('FuncPage', () => {
  let component: FuncPage;
  let fixture: ComponentFixture<FuncPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
