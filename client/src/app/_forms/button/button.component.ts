import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() icon?: string;
  @Input() label?: string;
  @Input() customClass?: string;
  @Input() tooltip?: string;
  @Input() placement: string = 'top';
  @Output() onClick = new EventEmitter();

  ngOnInit(): void {}

  handleClick() {
    this.onClick.emit();
  }
}
