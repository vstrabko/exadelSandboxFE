import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointInterviewPopupComponent } from './appoint-interview-popup.component';

describe('CandidateCardPopupComponent', () => {
  let component: AppointInterviewPopupComponent;
  let fixture: ComponentFixture<AppointInterviewPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointInterviewPopupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointInterviewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
