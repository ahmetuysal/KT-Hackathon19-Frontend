import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEquityFundingComponent } from './create-equity-funding.component';

describe('CreateEquityFundingComponent', () => {
  let component: CreateEquityFundingComponent;
  let fixture: ComponentFixture<CreateEquityFundingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEquityFundingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEquityFundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
