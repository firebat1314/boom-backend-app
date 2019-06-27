import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QryPage } from './qry.page';

describe('QryPage', () => {
  let component: QryPage;
  let fixture: ComponentFixture<QryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
