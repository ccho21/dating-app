import { Component, Input, OnInit, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {
  @Input() label?: string;
  @Input() type = 'text';

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }
  ngOnInit() {}

  writeValue(obj: any): void {
    // console.log('### obj', obj);
  }

  registerOnChange(fn: any): void {
    // console.log('### register on change', fn);
  }

  registerOnTouched(fn: any): void {
    // console.log('### register on touched', fn);
  }
}
