import { Component, ElementRef, EventEmitter, Input, Output, inject } from '@angular/core';
import { COMPONENT_REGISTRY } from '../component-registry';
import { PopoverService } from '../popover/PopoverService';

@Component({
  selector: 'app-querychip',
  template: `
  <button (click)="deleteChip()">label</button>
  <button (click)="deleteChip()">operator</button>
  <button [attr.query-component]="definition.componentName" (click)="showPopover($event.target)">{{definition.description}}</button>
  <button (click)="deleteChip()">X</button>
  `,
  styles: [`
    button {background-color: green;}
  `]
})
export class QuerychipComponent {

  popoverService = inject(PopoverService);

  @Input()
  name!: string;

  @Input()
  definition!: any;

  @Input()
  model!: any;

  @Output() deleteChipEvent: EventEmitter<any> = new EventEmitter();

  @Output() editorValueChanged: EventEmitter<any> = new EventEmitter();

  constructor(private elRef:ElementRef) {
  }

  deleteChip() {
    this.deleteChipEvent.emit(parseInt(this.elRef.nativeElement.getAttribute('refindex')));
  }

  showPopover(target: EventTarget | null): void {

    const htmlEl = target as HTMLElement;
    const componentName = htmlEl.getAttribute('query-component');

    const compRef = COMPONENT_REGISTRY.find( item => item.name === componentName);
    if (target) {
      if (compRef) {
        this.popoverService.open(compRef?.component, target as HTMLElement, {
          data: this.model
        })
        .afterClosed()
        .subscribe(result => {
          console.log(`Closed with ${result} for ${this.model}`);
          this.editorValueChanged.emit(result);
        });
      }
    }
}
}
