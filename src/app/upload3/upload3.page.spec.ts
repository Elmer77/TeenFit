import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Upload3Page } from './upload3.page';

describe('Upload3Page', () => {
  let component: Upload3Page;
  let fixture: ComponentFixture<Upload3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Upload3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Upload3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
