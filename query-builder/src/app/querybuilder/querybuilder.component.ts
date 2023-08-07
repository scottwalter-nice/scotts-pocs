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

  constructor(private elRef:ElementRef) {}

  @Input()
  queryComponentDefinitions!: any[];

  @Input()
  model!: any;

  ngOnInit(): void {
    console.debug('component definitions', this.queryComponentDefinitions);
  }

  onChange(target: any) {
    if (target?.target?.value === 'Select Query Type') {
      return;
    }

    const componentId = target?.target?.value;
    const queryComponentDefinition= this.queryComponentDefinitions.find(item  => item.id === componentId)
    const compRef = COMPONENT_REGISTRY.find( item => item.name === queryComponentDefinition.componentName);
    this.addChip(QuerychipComponent, queryComponentDefinition, compRef);
  }

  addChip(component: any, queryComponentDefinition:any, compRef:any) {
    console.log('addChip', queryComponentDefinition);
    const ref = this.vcr.createComponent(component);
    ref.setInput('name', 'scott' + new Date().getTime());
    ref.setInput('model', this.model.find((item:any) => item.filterId === queryComponentDefinition.id));

    this.model.push({ filterId: queryComponentDefinition.id });

    const modelValue = this.model.find((item:any) => item.filterId === queryComponentDefinition.id);
    ref.setInput('model', modelValue);
    // if (modelValue) {
    //   ref.setInput('model', modelValue.selectedValue);
    // } else {
    //   ref.setInput('model', 'no model value');
    // }

    ref.setInput('definition', {
        componentName: compRef.name,
        description: queryComponentDefinition.description
      }
    );



    this.chipRefs.push(ref);
    ref.location.nativeElement.setAttribute("refIndex","" + (new Date().getTime()));
    ref.location.nativeElement.setAttribute("data-filter-id",queryComponentDefinition.id);

    (ref.instance as QuerychipComponent).editorValueChanged.subscribe((value) => {
      console.log('BINGO', value);

      const modelValue = this.model.find((item: any) => item.filterId === value.filterId);
      modelValue.selectedItem = value.selectedItem;
    });

    (ref.instance as QuerychipComponent).deleteChipEvent.subscribe((index) => {
      for (const value of this.chipRefs) {
        const refIndex = value.location.nativeElement.getAttribute('refindex');
        const filterId = value.location.nativeElement.getAttribute('data-filter-id');
        if (parseInt(index)===parseInt(refIndex)) {
          console.log(refIndex);
          value.destroy();

          const indexToRemove = this.model.findIndex( (el: any) => el.filterId === filterId );
          console.log(indexToRemove);
          if (indexToRemove > -1) {
            this.model.splice(indexToRemove, 1)
          }

          break;
        }
      }

      // this.vcr.remove(index);)
    });

    //TODO probably don't need to force a change detection on entire app
    this.appRef.tick();
  }



  parentFun() {
    alert('parent component function.');
  }
}
