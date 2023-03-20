import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  Self,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent implements OnInit, ControlValueAccessor {
  @Input() label?: string;
  @Input() type = 'text';
  @Input() formControl?: FormControl;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {}
  ngOnInit() {
    console.log(this.formControl);
  }

  writeValue(value: any): void {
    // this.formControl?.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
