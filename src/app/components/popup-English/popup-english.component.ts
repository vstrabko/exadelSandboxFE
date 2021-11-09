import { Component, Input } from '@angular/core';
import { EnglishLevels } from '../../enums/english-levels.enum';

@Component({
  selector: 'app-popup-english',
  templateUrl: './popup-english.component.html',
  styleUrls: ['./popup-english.component.scss'],
})
export class PopupEnglishComponent {
  @Input() title: string = 'Write your review';
  level: string;
  levels = EnglishLevels;
  levelsValues = Object.values(this.levels);
}
