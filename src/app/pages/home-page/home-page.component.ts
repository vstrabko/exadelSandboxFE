import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { CandidateContextService } from 'src/app/services/candidate-context.service';
import { Sandbox } from 'src/app/models/sandbox.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private tosterMessage: ToastService,
    private candidateContextService: CandidateContextService,
  ) {}

  sandboxChosen: Partial<Sandbox> = {};
  sandboxes: Sandbox[] = [];

  inputChange(value: string): void {
    if (this.sandboxes.length) {
      const sandCh = this.sandboxes.find((item: Sandbox) => item.name === value);
      if (sandCh) {
        this.sandboxChosen = sandCh;
      }
    }
  }

  ngOnInit(): void {
    this.sandboxes = this.candidateContextService.getSandbox();
  }

  testLog(): void {
    this.tosterMessage.showSuccess('Вы успешно отправили форму', 'ОТПРАВЛЕНО');
  }
}
