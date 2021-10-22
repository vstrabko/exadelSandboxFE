import { Component } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private roles = {
    //todo: till not back-end
    nobody: '',
    admin: 'admin',
    manager: 'manager',
    recruiter: 'recruiter',
    interviewer: 'interviewer',
    mentor: 'mentor',
  };

  public role: string = this.roles.admin; //todo: role from back-end
  public userName: string = 'Mikhail'; //todo: name of user from back-end

  showUsers(): void {
    console.log('user');
  }
}
