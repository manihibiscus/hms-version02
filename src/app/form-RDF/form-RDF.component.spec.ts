/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormRDFComponent } from './form-RDF.component';

describe('FormRDFComponent', () => {
  let component: FormRDFComponent;
  let fixture: ComponentFixture<FormRDFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRDFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
