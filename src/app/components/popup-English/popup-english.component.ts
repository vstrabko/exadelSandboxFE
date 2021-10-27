import { Component, Input } from '@angular/core';
import { englishLevelList } from '../../interfaces/interfaces';

@Component({
  selector: 'app-popup-english',
  templateUrl: './popup-english.component.html',
  styleUrls: ['./popup-english.component.scss'],
})
export class PopupEnglishComponent {
  @Input() title: string = 'Write your review';

  public englishLevelList: englishLevelList[] = [
    { id: 1, name: 'Beginner' },
    { id: 2, name: 'A1 Elementary' },
    { id: 3, name: 'A2 Pre-intermediate' },
    { id: 4, name: 'B1 Low Intermediate' },
    { id: 5, name: 'B1 Intermediate' },
    { id: 6, name: 'B2 Upper Intermediates' },
    { id: 7, name: 'C1 Pre-advanced' },
    { id: 8, name: 'C2 Advanced' },
    { id: 9, name: 'C2 Very Advanced' },
  ];
}
