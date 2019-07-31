import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Upload2Page } from './upload2.page';

describe('Upload2Page', () => {
  let component: Upload2Page;
  let fixture: ComponentFixture<Upload2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Upload2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Upload2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
