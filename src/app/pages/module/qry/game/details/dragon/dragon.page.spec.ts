import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragonPage } from './dragon.page';

describe('DragonPage', () => {
  let component: DragonPage;
  let fixture: ComponentFixture<DragonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
