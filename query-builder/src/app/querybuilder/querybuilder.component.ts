import { ApplicationRef, Component, ComponentRef, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef, inject } from '@angular/core';
import { COMPONENT_REGISTRY } from '../component-registry';
import { PopoverService } from '../popover/PopoverService';
import { QuerychipComponent } from '../querychip/querychip.component';

@Component({
  selector: 'app-querybuilder',
  templateUrl: './querybuilder.component.html',
  styleUrls: ['./querybuilder.component.scss']
})
export class QuerybuilderComponent implements OnInit{
  popoverService = inject(PopoverService);
  selectedValue: any;
  allComponets = COMPONENT_REGISTRY;

  chipRefs:ComponentRef<unknown>[] = [];

  appRef = inject(ApplicationRef);

  @ViewChild("viewContainerRef", { read: ViewContainerRef }) vcr!: ViewContainerRef;

  @ViewChildren(QuerychipComponent) queryChipChildren!: QueryList<QuerychipComponent>;


  constructor(private elRef:ElementRef) {
  }

  @Input()
  queryComponentDefinitions!: any[];

  ngOnInit(): void {
    console.debug('component definitions', this.queryComponentDefinitions);
  }

  onChange(target: any) {
    console.log('BBBB', target?.target?.value);
    if (target?.target?.value === 'Select Query Type') {
      return;
    }

    const componentId = parseInt(target?.target?.value);
    const queryComponentDefinition= this.queryComponentDefinitions.find(item  => item.id === componentId)
    const compRef = COMPONENT_REGISTRY.find( item => item.name === queryComponentDefinition.componentName);
    this.addChip(QuerychipComponent, queryComponentDefinition, compRef);
  }

  addChip(component: any, queryComponentDefinition:any, compRef:any) {
    const ref = this.vcr.createComponent(component);
    ref.setInput('name', 'scott' + new Date().getTime());
    ref.setInput('definition', {
        componentName: compRef.name,
        description: queryComponentDefinition.description
      }
    );

    this.chipRefs.push(ref);
    ref.location.nativeElement.setAttribute("refIndex","" + (new Date().getTime()));

    (ref.instance as QuerychipComponent).deleteChipEvent.subscribe((index) => {
      for (const value of this.chipRefs) {
        const refIndex = value.location.nativeElement.getAttribute('refindex');
        if (parseInt(index)===parseInt(refIndex)) {
          value.destroy();
          break;
        }
      }

      // this.vcr.remove(index);)
    });
    this.appRef.tick();
  }
}
