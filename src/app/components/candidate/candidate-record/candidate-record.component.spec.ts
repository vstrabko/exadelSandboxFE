import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateRecordComponent } from './candidate-record.component';

describe('CandidateRecordComponent', () => {
  let component: CandidateRecordComponent;
  let fixture: ComponentFixture<CandidateRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
