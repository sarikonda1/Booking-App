import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaPickerPage } from './area-picker.page';

describe('AreaPickerPage', () => {
  let component: AreaPickerPage;
  let fixture: ComponentFixture<AreaPickerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaPickerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaPickerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
