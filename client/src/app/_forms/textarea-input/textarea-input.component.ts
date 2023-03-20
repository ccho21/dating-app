import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-textarea-input',
  templateUrl: './textarea-input.component.html',
  styleUrls: ['./textarea-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaInputComponent),
      multi: true,
    },
  ],
})
export class TextareaInputComponent implements OnInit, ControlValueAccessor {
  @Input() label?: string;
  @Input() rows?: number;

  @Input() formControl?: FormControl;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {}
  ngOnInit() {}

  writeValue(value: any): void {
    this.formControl?.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
