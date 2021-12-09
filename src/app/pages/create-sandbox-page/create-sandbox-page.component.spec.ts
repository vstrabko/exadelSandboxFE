import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSandboxPageComponent } from './create-sandbox-page.component';

describe('CreateSandboxPageComponent', () => {
  let component: CreateSandboxPageComponent;
  let fixture: ComponentFixture<CreateSandboxPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSandboxPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSandboxPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
