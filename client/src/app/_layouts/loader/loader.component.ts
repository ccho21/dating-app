import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnChanges {
  @Input() loading?: boolean;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('### chnagse', changes);
  }

  ngOnInit(): void {}
}
