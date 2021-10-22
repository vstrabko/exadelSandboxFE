import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Output() modal: EventEmitter<boolean> = new EventEmitter<boolean>();
  public title = 'Log in';
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  submit(): void {
    if (this.email.valid && this.password.valid) {
      const user = {
        username: this.email.value,
        password: this.password.value,
      };
      this.modal.emit(false);
      // document.location = '/sandbox'
    }
  }
  cancel(): void {
    this.modal.emit(false);
  }
}
