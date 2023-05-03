/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DialogBillsComponent } from './dialogBills.component';

describe('DialogBillsComponent', () => {
  let component: DialogBillsComponent;
  let fixture: ComponentFixture<DialogBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
