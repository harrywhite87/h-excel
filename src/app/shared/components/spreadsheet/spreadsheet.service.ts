import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpreadsheetService {

  template = {
    headers: [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
    ],
    data: [
      [
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },

      ],
      [
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
      ],
      [
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
      ],
      [
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
      ],
      [
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
        { value: '', formula: '', formatting: [] },
      ]
    ],
  }

  constructor() { }

  getSheet() {
    return this.template;
  }

}
