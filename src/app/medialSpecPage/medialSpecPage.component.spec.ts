/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MedialSpecPageComponent } from './medialSpecPage.component';

describe('MedialSpecPageComponent', () => {
  let component: MedialSpecPageComponent;
  let fixture: ComponentFixture<MedialSpecPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedialSpecPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedialSpecPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
