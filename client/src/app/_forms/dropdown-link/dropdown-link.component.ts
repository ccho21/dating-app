import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-link',
  templateUrl: './dropdown-link.component.html',
  styleUrls: ['./dropdown-link.component.scss'],
})
export class DropdownLinkComponent implements OnInit {
  @Input() icon?: string;
  @Input() label?: string;
  @Input() customClass?: string;
  @Input() menuClass?: string;
  @Input() tooltip?: string;
  @Input() ariaControls?: string;
  @Input() thumbnail?: string;
  @Input() id?: string;
  @Output() onClick = new EventEmitter();
  @Output() onChange = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  handleClick() {
    this.onClick.emit();
  }

  onOpenChange(data: boolean): void {
    this.onChange.emit(data);
  }
}
