import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpListPage } from './ip-list.page';

describe('IpListPage', () => {
  let component: IpListPage;
  let fixture: ComponentFixture<IpListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
