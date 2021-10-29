import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateRequestComponent } from './candidate-request.component';

describe('CandidateRequestComponent', () => {
  let component: CandidateRequestComponent;
  let fixture: ComponentFixture<CandidateRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateRequestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
