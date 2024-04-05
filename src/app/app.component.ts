import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SchulteGrid';

  rows: number[] = [];
  columns: number[] = [];

  rowControl = new FormControl(4, [Validators.required, Validators.pattern(/^\d+$/)]);
  columnControl = new FormControl(4, [Validators.required, Validators.pattern(/^\d+$/)]);

  numbers: number[] = [];
  
  curStep: number = 1;

  timer: number = 0;
  timerInterval: any;

  isStarted: boolean = false;
  
  constructor(private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    if (this.checkValidation()) {
      this.updateRowColumn();
    }
  }

  updateRowColumn(): void {
    this.rows = [].constructor(this.rowControl.value);
    this.columns = [].constructor(this.columnControl.value);
    this.generateGrid();
  }
  
  onFocusOut(): void {
    if (this.checkValidation()) {
      this.updateRowColumn();
    }
  }

  checkValidation(): boolean {
    let isValid = true;
    if (this.rowControl.errors || this.columnControl.errors) {
      isValid = false;
    }
    return isValid;
  }

  generateGrid(): void {
    this.resetData();
    this.numbers = this.getUniqueNumbers(this.columnControl.value, this.rowControl.value);
  }

  onBlockClick(curNumber: number): void {
    if (curNumber === this.curStep) {
      ++this.curStep;
    }
    if (this.rowControl.value && this.columnControl.value) {
      if (this.curStep > this.rowControl.value * this.columnControl.value) {
        this.onWin();
      }
    }
  }

  onStartClick(): void {
    this.timerInterval = setInterval(() => {
      ++this.timer;
    }, 10);
    this.isStarted = true;
  }

  private onWin(): void {
    clearInterval(this.timerInterval);
    const message = `用时${this.timer / 100}s完成, 笨比`;
    this._snackBar.open(message, 'close');
    this.updateRowColumn();
  }

  private resetData(): void {
    this.curStep = 1;
    this.isStarted = false;
    clearInterval(this.timerInterval);
    this.timer = 0;
  }

  private getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  private getUniqueNumbers(col: number | null, row: number | null): number[] {
    const numberList: number[] = [];
    if (col && row) {
      while (numberList.length < col * row) {
        const rand = this.getRndInteger(1, col * row);
        if (!numberList.includes(rand)) {
          numberList.push(rand);
        }
      }
    }
    return numberList;
  }

}
