import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private roles = {
    //todo: till not back-end
    nobody: '',
    admin: 'admin',
    manager: 'manager',
    recruiter: 'recruiter',
    interviewer: 'interviewer',
    mentor: 'mentor',
  };

  public isVisible = false;
  public vision = false;
  public userName = '';
  public role: string = this.roles.admin; //todo: role from back-end

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.authSubject.subscribe((res: Partial<User>): void => {
      this.userName = !!res?.name ? res.name : '';
    });
  }
  openModal(): void {
    this.isVisible = true;
  }
  closeModal(): void {
    this.isVisible = false;
  }

  showSpinner(): void {
    this.vision = true;
    setTimeout(() => {
      this.vision = false;
    }, 3000);
  }

  logOut(): void {
    this.authService.logout();
  }
}
