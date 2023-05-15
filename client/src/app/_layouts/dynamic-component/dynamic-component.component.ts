import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss'],
})
export class DynamicComponentComponent implements OnInit, AfterViewInit {
  componentNames = ['ComponentOneComponent', 'ComponentTwoComponent'];

  @ViewChild('componentContainer', { read: ViewContainerRef })
  componentContainer?: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}
  ngOnInit(): void {}

  ngAfterViewInit() {
    this.componentNames.forEach((componentName) => {
      const factory = this.resolver.resolveComponentFactory(
        eval(componentName)
      );
      const componentRef = this.componentContainer?.createComponent(factory);
      componentRef?.changeDetectorRef.detectChanges();
    });
  }
}
