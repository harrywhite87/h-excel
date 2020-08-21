import { Component, OnInit, HostListener } from '@angular/core';
import { SpreadsheetService } from './spreadsheet.service';

@Component({
  selector: 'app-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.scss']
})
export class SpreadsheetComponent implements OnInit {

  sheet;
  addRows = 10;
  selectBounds = { c: 0, r: 0, cSpan: 1, rSpan: 1, cStart: 0, rStart: 0 };
  dragBounds = { c: 0, r: 0, cSpan: 1, rSpan: 1, cStart: 0, rStart: 0 };
  copyBounds = { c: 0, r: 0, cSpan: 1, rSpan: 1, cStart: 0, rStart: 0 };
  selecting = false;
  copying = false;
  ctrlKey = false;
  copyArray;
  copyingSelection = false;
  shiftKey = false;
  holdShiftKey = false;
  log = [];
  logPosition = 0;
  editingCell = false;
  currentCell;
  justClicked = false;
  doubleClicked = false;
  cellFocus = false;
  //#region Handle keys

  @HostListener('document:keydown', ['$event'])
  handleKeyboardDownEvent(event: KeyboardEvent) {
    if (!this.editingCell) {
      if (event.key === 'Escape') {
        this.copyingSelection = false;
      }
      if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
        this.copyBounds = clone(this.selectBounds);
        this.copyingSelection = true;
        this.copy(this.copyBounds);
        copyToClipboard(this.copyArray);
      } else if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
        if (this.copyingSelection) {
          this.paste();
        } else {
          this.pasteFromClipboard();
        }
        this.copyingSelection = false;
      }
      if (event.key === 'ArrowDown' && this.selectBounds.r + this.selectBounds.rSpan < this.sheet.data.length) {
        if (event.shiftKey) {
          this.selectBounds.rSpan++;
        } else {
          this.selectBounds.r++;
          this.selectBounds.rSpan = 1;
          this.selectBounds.cSpan = 1;
        }
        this.dragBounds = clone(this.selectBounds);
      }
      if (event.key === 'ArrowUp') {
        if (event.shiftKey) {
          if (this.selectBounds.rSpan > 1) {
            this.selectBounds.rSpan--;
          }
        } else if (this.selectBounds.r > 0) {
          this.selectBounds.r--;
          this.selectBounds.rSpan = 1;
          this.selectBounds.cSpan = 1;
        }
        this.dragBounds = clone(this.selectBounds);
      }
      if ((event.key === 'ArrowRight' || event.key === 'Enter')
        && this.selectBounds.c + this.selectBounds.cSpan < this.sheet.data[0].length) {
        if (event.shiftKey) {
          this.selectBounds.cSpan++;
        } else {
          this.selectBounds.c++;
          this.selectBounds.rSpan = 1;
          this.selectBounds.cSpan = 1;
        }
        this.dragBounds = clone(this.selectBounds);
      }
      if (event.key === 'ArrowLeft') {
        if (event.shiftKey) {
          if (this.selectBounds.cSpan > 1) {
            this.selectBounds.cSpan--;
          }
        } else if (this.selectBounds.c - 1 >= 0) {
          this.selectBounds.c--;
          this.selectBounds.rSpan = 1;
          this.selectBounds.cSpan = 1;
        }
        this.dragBounds = clone(this.selectBounds);
      }
    }

  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardUpEvent(event: KeyboardEvent) {
    this.shiftKey = false;
    this.ctrlKey = false;
  }

  unfocusCell() {
    this.doubleClicked = false;
    this.editingCell = false;
    if (this.currentCell) {
      this.currentCell.classList.remove('editable');
    }
  }

  //#endregion

  constructor(private spreadsheetService: SpreadsheetService) { }

  ngOnInit() {
    this.sheet = this.spreadsheetService.getSheet();
    this.commitToLog();
  }
  commitToLog() {
    this.log.push(clone(this.sheet));
    this.logPosition++;
  }
  // drag behaviour

  cellDown(c, r, cell) {
    if (!cell.classList.contains('editable')) {
      if (this.justClicked === true) {
        this.doubleClicked = true;
        this.editingCell = true;
        cell.classList.add('editable');
        cell.focus();
        this.currentCell = cell;
        this.selecting = false;
      } else {
        this.justClicked = true;
        setTimeout(() => {
          this.justClicked = false;
          if (this.doubleClicked === false) {
            this.unfocusCell();
          }
          this.doubleClicked = false;
        }, 300);
      }
      this.selectBounds = { c: c, r: r, cSpan: 1, rSpan: 1, cStart: c, rStart: r };
      this.dragBounds = clone(this.selectBounds);
      this.selecting = true;
    }


  }

  cellOver(c, r) {
    if (!this.editingCell) {
      if (this.selecting) {
        if (this.selectBounds.cStart >= c) {
          this.selectBounds.c = c;
          this.selectBounds.cSpan = this.selectBounds.cStart - c + 1;
        } else {
          this.selectBounds.cSpan = c - this.selectBounds.cStart + 1;

        }
        if (this.selectBounds.rStart >= r) {
          this.selectBounds.r = r;
          this.selectBounds.rSpan = this.selectBounds.rStart - r + 1;
        } else {
          this.selectBounds.rSpan = r - this.selectBounds.rStart + 1;
        }
        this.dragBounds = clone(this.selectBounds);
      }
      if (this.copying) {
        if (this.dragBounds.rStart >= r) {
          this.dragBounds.r = r;
          this.dragBounds.rSpan = this.dragBounds.rStart - r + 1;
        } else {
          this.dragBounds.rSpan = r - this.dragBounds.rStart + 1;
        }
      }
    }

  }

  cellUp(c, r) {
    if (!this.editingCell) {
      if (this.selecting) {
        this.dragBounds = clone(this.selectBounds);
        this.selecting = false;
      }
      if (this.copying) {
        this.copy(this.selectBounds);
        this.dragPaste(this.dragBounds);
        this.selectBounds = clone(this.dragBounds);
        this.copying = false;
      }
    }
  }

  copy(bounds) {
    this.copyArray = [];
    for (let i = bounds.r; i < bounds.r + bounds.rSpan; i++) {
      const row = [];
      for (let h = bounds.c; h < bounds.c + bounds.cSpan; h++) {
        row.push(this.sheet.data[i][h]);
      }
      this.copyArray.push(row);
    }
  }

  dragPaste(bounds) {
    let row = 0, column = 0;
    for (let i = bounds.r; i < bounds.r + bounds.rSpan; i++) {
      if (!(i >= this.selectBounds.r && i <= this.selectBounds.r + this.selectBounds.rSpan - 1)) {
        for (let h = bounds.c; h < bounds.c + bounds.cSpan; h++) {
          if (!(i >= this.selectBounds.r && i <= this.selectBounds.r + this.selectBounds.rSpan - 1)) {
            this.sheet.data[i][h] = this.copyArray[row][column];
            column = cap(column + 1, this.copyArray[row].length);
          }
        }
        row = cap(row + 1, this.copyArray.length);
      }
    }
  }

  paste() {
    if (this.selectBounds.rSpan > 1 || this.selectBounds.cSpan > 1) {
      let r, c;
      r = 0;
      for (let i = this.selectBounds.r; i < this.selectBounds.rSpan + this.selectBounds.r; i++) {
        c = 0;
        for (let h = this.selectBounds.c; h < this.selectBounds.cSpan + this.selectBounds.c; h++) {
          this.sheet.data[i][h] = this.copyArray[r][c];
          c = cap(c + 1, this.copyArray[0].length);

        }
        r = cap(r + 1, this.copyArray.length);
      }
    } else {
      let rSpan, cSpan;
      rSpan = 0;
      for (let i = 0; i < this.copyArray.length; i++) {
        cSpan = 0;
        if (i + this.selectBounds.r < this.sheet.data.length) {
          for (let h = 0; h < this.copyArray[i].length; h++) {
            if (h + this.selectBounds.c < this.sheet.data[0].length) {
              this.sheet.data[i + this.selectBounds.r][h + this.selectBounds.c] = this.copyArray[i][h];
              cSpan++;
            }
          }
          rSpan++;
        }
      }
      this.selectBounds.rSpan = rSpan;
      this.selectBounds.cSpan = cSpan;
      this.dragBounds = clone(this.selectBounds);
    }
  }

  pasteFromClipboard() {
    navigator.clipboard.readText()
      .then(text => {
        this.copyArray = [];
        const rows = text.split(/\r?\n/);
        rows.forEach(row => {
          this.copyArray.push(row.split('\t'));
        });
        this.paste();
      })
      .catch(err => {
        console.error('Failed to read clipboard contents', err);
      });
  }

  handleDown(c, r) {
    this.copying = true;
  }

  sheetOut() {
    this.selecting = false;
    this.copying = false;
    this.dragBounds = clone(this.selectBounds);

  }

  singleClick(cell) {
  }

  doubleClick(cell) {

  }
  // buttons
  add() {
    const cell = { value: '', formula: '', formatting: [] };
    const row = [];
    this.sheet.data[0].forEach(element => {
      row.push(cell);
    });
    for (let i = 0; i < this.addRows; i++) {
      this.sheet.data.push(row);
    }
  }
  inputKey(e, cell) {
    if (e.target.value[0] === '=') {
      console.log(cell)
    }

  }
}

function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

function cap(value, cap) {
  return value - (Math.floor(value / cap) * cap);
}

function copyToClipboard(array) {
  let str = '';
  array.forEach((row, i, iArray) => {
    row.forEach((column, h, hArray) => {
      str += column;
      if (hArray.length - 1 !== h) {
        str += '	';
      }
    });
    if (iArray.length - 1 !== i) {
      str += '\n';
    }
  });
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}