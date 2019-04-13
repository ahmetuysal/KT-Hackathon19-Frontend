import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFundraisingComponent } from './create-fundraising.component';

describe('CreateFundraisingComponent', () => {
  let component: CreateFundraisingComponent;
  let fixture: ComponentFixture<CreateFundraisingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFundraisingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFundraisingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
