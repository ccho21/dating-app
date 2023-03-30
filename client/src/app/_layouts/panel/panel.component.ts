import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  @Input() customClass?: string;
  @Input() title?: string;
  @Input() sub?: string;
  constructor() {}

  ngOnInit(): void {}
}
