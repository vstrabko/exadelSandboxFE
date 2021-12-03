import { Component, OnInit } from '@angular/core';
import { SandboxService } from 'src/app/services/sandbox-service';
import { Sandbox } from 'src/app/models/sandbox.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private sandboxService: SandboxService) {}

  sandboxChosen: Partial<Sandbox> = {};
  sandboxes: Sandbox[] = [];

  inputChange(value: string): void {
    if (this.sandboxes.length) {
      const _sandboxChosen = this.sandboxes.find((item: Sandbox) => item.name === value);
      if (_sandboxChosen) {
        this.sandboxChosen = _sandboxChosen;
      }
    }
  }

  ngOnInit(): void {
    this.sandboxService
      .get()
      .subscribe(
        (data: Sandbox[]) =>
          (this.sandboxes = data.filter((sandbox: Sandbox) => sandbox.status === 'Registration')),
      );
  }
}
