import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WadvPage } from './wadv.page';

describe('WadvPage', () => {
  let component: WadvPage;
  let fixture: ComponentFixture<WadvPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WadvPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WadvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
