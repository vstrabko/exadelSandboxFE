import { Component } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // constructor(private isUserShown: isUserShown) {}
  private roles = {
    // till not back-end
    nobody: '',
    admin: 'admin',
    manager: 'manager',
    recruiter: 'recruiter',
    interviewer: 'interviewer',
    mentor: 'mentor',
  };

  public role: string = this.roles.admin; //role from back-end
  public userName: string = 'Mikhail'; //name of user from back-end

  showUsers(): void {
    console.log('user');
  }
}
