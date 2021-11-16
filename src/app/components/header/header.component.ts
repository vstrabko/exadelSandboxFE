import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../../services/auth.service';
import { ModalWindowService } from '../modal-window/modal-window.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isVisible = false;
  public vision = false;
  public userName = '';

  constructor(private authService: AuthService, private modalWindowService: ModalWindowService) {}

  public ngOnInit(): void {
    this.authService.authSubject.subscribe((res: Partial<User> | null): void => {
      this.userName = !!res?.fullName ? res.fullName : '';
    });
    this.modalWindowService.visible.subscribe((result: boolean) => (this.isVisible = result));
  }

  openModal(): void {
    this.modalWindowService.visible.next(true);
    setTimeout(() => {
      this.modalWindowService.modalWindow.next('login');
    }, 200);
  }

  closeModal(): void {
    this.modalWindowService.visible.next(false);
  }

  showSpinner(): void {
    this.vision = true;
    setTimeout(() => {
      this.vision = false;
    }, 500);
  }

  logOut(): void {
    this.authService.logout().subscribe();
  }
}
