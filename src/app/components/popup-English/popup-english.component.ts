import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popup-english',
  templateUrl: './popup-english.component.html',
  styleUrls: ['./popup-english.component.scss'],
})
export class PopupEnglishComponent {
  @Input() title: string = 'Write your review';
}
