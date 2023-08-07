import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { COMPONENT_REGISTRY } from '../component-registry';
import { PopoverService } from '../popover/PopoverService';

@Component({
  selector: 'app-querychip',
  template: `
    <div class="chip-container">
      <div class="chip-title">{{label}}</div>
      <div class="chip-operator">Operator</div>
      <div class="chip-value">
          <span [attr.query-component]="definition.componentName" (click)="showPopover($event.target)">
            <ng-container *ngIf="model">{{model.selectedValue}}</ng-container>
           ⌄</span>
      </div>
      <button (click)="deleteChip()">×</button>
    </div>
  `,
  styles: [`
    .chip-container {
      border-radius: 4px;
      border: 1px solid var(--interface-border-1, #D2D8DB);
      background: var(--base-fff, #FFF);
      display: flex;
      align-items: center;
    }

    .chip-title {
      background: var(--interface-background-125, #DBE6F0);
      display: flex;
      height: 28px;
      padding: 0px 8px;
      align-items: center;
      gap: 8px;
    }

    .chip-operator {
      display: flex;
      height: 28px;
      padding: 0px 8px;
      align-items: center;
      gap: 4px;
    }

    .chip-value {
      display: flex;
      height: 28px;
      padding: 0px 8px;
      align-items: center;
      gap: 4px;
      background: var(--global-state-inactive-text, #3F5C69);
      min-width: 20px;
    }
  `]
})
export class QuerychipComponent implements OnChanges {

  popoverService = inject(PopoverService);

  label!: string;

  @Input()
  name!: string;

  @Input()
  definition!: any;

  @Input()
  model: any;

  @Output() deleteChipEvent: EventEmitter<any> = new EventEmitter();

  @Output() editorValueChanged: EventEmitter<any> = new EventEmitter();

  constructor(private elRef:ElementRef) {
    console.log('RRRRR', this.definition);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

    if (changes['definition'].currentValue) {
      console.log('CCCC');
      this.label = changes['definition'].currentValue.description;
    }
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
