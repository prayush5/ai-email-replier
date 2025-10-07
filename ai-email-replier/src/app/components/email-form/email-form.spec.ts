import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailForm } from './email-form';

describe('EmailForm', () => {
  let component: EmailForm;
  let fixture: ComponentFixture<EmailForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
