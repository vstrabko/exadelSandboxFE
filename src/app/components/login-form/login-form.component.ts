/* eslint-disable @typescript-eslint/unbound-method */
import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { REGEXP } from '../../shared/constants/validators';
import { ModalWindowService } from '../modal-window/modal-window.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  @Output() modal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() log: EventEmitter<boolean> = new EventEmitter<boolean>();

  public base_URL = environment.API_URL;
  public title = 'Log in';
  email = new FormControl(null, [Validators.required, Validators.pattern(REGEXP.email)]);
  password = new FormControl(null, [
    Validators.required,
    Validators.pattern(REGEXP.password_length),
  ]);
  public modalForm: Subscription;

  constructor(
    private authService: AuthService,
    private modalWindowService: ModalWindowService,
    private translateService: TranslateService,
  ) {}
  ngOnInit(): void {
    this.modalForm = this.modalWindowService.event.subscribe(() => {
      this.submit();
    });
    this.title = this.translateService.instant('login.title');
  }

  ngOnDestroy(): void {
    if (this.modalForm) {
      this.modalForm.unsubscribe();
    }
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
