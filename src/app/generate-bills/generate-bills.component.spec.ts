import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateBillsComponent } from './generate-bills.component';

describe('GenerateBillsComponent', () => {
  let component: GenerateBillsComponent;
  let fixture: ComponentFixture<GenerateBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateBillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
