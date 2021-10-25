import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { REGEXP } from '../../shared/constants/validators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  constructor(private router: Router) {}
  @Output() modal: EventEmitter<boolean> = new EventEmitter<boolean>();
  public title = 'Log in';
  email = new FormControl(null, [Validators.required, Validators.pattern(REGEXP.email)]);
  password = new FormControl(null, [
    Validators.required,
    Validators.pattern(REGEXP.password_length),
  ]);

  submit(): void {
    if (this.email.valid && this.password.valid) {
      const user = {
        username: this.email.value,
        password: this.password.value,
      };
      this.modal.emit(false);
    }
  }
  cancel(): void {
    this.modal.emit(false);
  }
}
