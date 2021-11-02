/* eslint-disable @typescript-eslint/unbound-method */
import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { REGEXP } from '../../shared/constants/validators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Output() modal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() log: EventEmitter<boolean> = new EventEmitter<boolean>();

  public title = 'Log in';
  email = new FormControl(null, [Validators.required, Validators.pattern(REGEXP.email)]);
  password = new FormControl(null, [
    Validators.required,
    Validators.pattern(REGEXP.password_length),
  ]);

  constructor(private authService: AuthService) {}

  submit(): void {
    if (this.email.valid && this.password.valid) {
      this.modal.emit(false);
      this.log.emit(this.authService.isAuthenticated());

      this.authService.login(this.email.value, this.password.value).subscribe(
        (data: any): void => console.log(data),
        (error: any): void => console.log(error),
      );
    }
  }

  cancel(): void {
    this.modal.emit(false);
  }
}
