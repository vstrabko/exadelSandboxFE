import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateCardPopupComponent } from './candidate-card-popup.component';

describe('CandidateCardPopupComponent', () => {
  let component: CandidateCardPopupComponent;
  let fixture: ComponentFixture<CandidateCardPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateCardPopupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateCardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
