/* eslint-disable @typescript-eslint/unbound-method */
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { REGEXP } from '../../shared/constants/validators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Output() modal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() log: EventEmitter<boolean> = new EventEmitter<boolean>();

  public title = 'Log in';
  email = new FormControl(null, [Validators.required, Validators.pattern(REGEXP.email)]);
  password = new FormControl(null, [
    Validators.required,
    Validators.pattern(REGEXP.password_length),
  ]);

  constructor(private authService: AuthService, private translateService: TranslateService) {}

  ngOnInit(): void {
    this.title = this.translateService.instant('login.title');
  }

  submit(): void {
    if (this.email.valid && this.password.valid) {
      this.modal.emit(false);
      this.log.emit(this.authService.isAuthenticated());

      this.authService.login(this.email.value, this.password.value).subscribe();
    }
  }

  cancel(): void {
    this.modal.emit(false);
  }
}
