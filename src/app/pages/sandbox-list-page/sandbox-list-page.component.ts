import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sandbox-list-page',
  templateUrl: './sandbox-list-page.component.html',
  styleUrls: ['./sandbox-list-page.component.scss'],
})
export class SandboxListPageComponent {
  constructor(private router: Router) {}
  goCreateSandbox(): void {
    this.router.navigateByUrl('/sandbox/create');
  }
}
