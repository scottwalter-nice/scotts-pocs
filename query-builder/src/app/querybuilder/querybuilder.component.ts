import { ApplicationRef, Component, ComponentRef, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef, inject } from '@angular/core';
import { COMPONENT_REGISTRY } from '../component-registry';
import { PopoverService } from '../popover/PopoverService';
import { QuerychipComponent } from '../querychip/querychip.component';
import { query } from '@angular/animations';

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
  filtersAll: any[] = [];
  filtersAvailableToAdd: any[] = [];

  @Input()
  model!: any;

  ngOnInit(): void {
    console.debug('component definitions', this.queryComponentDefinitions);
    this.filtersAll = [...this.queryComponentDefinitions];
    console.log(this.queryComponentDefinitions);
    console.log(this.filtersAll);
    this.updateAvailableFiltersToAdd();
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

  addFilterById(filterId: string) {
    setTimeout( () => {
      const queryComponentDefinition= this.queryComponentDefinitions.find(item  => item.id === filterId);
      const compRef = COMPONENT_REGISTRY.find( item => item.name === queryComponentDefinition.componentName);
      this.addChip(QuerychipComponent, queryComponentDefinition, compRef);
      const filter = this.filtersAll.find( item => item.id === filterId);
      filter._added = true;
      this.updateAvailableFiltersToAdd();
    },1);
  }

  addChip(component: any, queryComponentDefinition:any, compRef:any) {
    const ref = this.vcr.createComponent(component);
    ref.setInput('name', 'scott' + new Date().getTime());
    ref.setInput('model', this.model.find((item:any) => item.filterId === queryComponentDefinition.id));

    this.model.push({ filterId: queryComponentDefinition.id });

    const modelValue = this.model.find((item:any) => item.filterId === queryComponentDefinition.id);
    ref.setInput('model', modelValue);

    ref.setInput('definition', {
        componentName: compRef.name,
        description: queryComponentDefinition.description,
        id: queryComponentDefinition.id,
        componentConfig: queryComponentDefinition.componentConfig
      }
    );



    this.chipRefs.push(ref);
    ref.location.nativeElement.setAttribute("refIndex","" + (new Date().getTime()));
    ref.location.nativeElement.setAttribute("data-filter-id",queryComponentDefinition.id);

    (ref.instance as QuerychipComponent).editorValueChanged.subscribe((value) => {
      const modelValue = this.model.find((item: any) => item.filterId === value.filterId);
      const clonedValue = Object.assign({}, value);
      delete clonedValue.filterId;

      modelValue.selectedItem = clonedValue;
    });

    (ref.instance as QuerychipComponent).deleteChipEvent.subscribe((index) => {
      for (const value of this.chipRefs) {
        const refIndex = value.location.nativeElement.getAttribute('refindex');
        const filterId = value.location.nativeElement.getAttribute('data-filter-id');
        if (parseInt(index)===parseInt(refIndex)) {
          value.destroy();

          const indexToRemove = this.model.findIndex( (el: any) => el.filterId === filterId );
          if (indexToRemove > -1) {
            this.model.splice(indexToRemove, 1)
          }
          const filter = this.filtersAll.find( item => item.id === filterId);
          filter._added = false;
          this.updateAvailableFiltersToAdd();

          break;
        }
      }

      // this.vcr.remove(index);)
    });
  }

  updateAvailableFiltersToAdd() {
    let availableFilters: any[] = [];
    this.filtersAll.forEach( (filter) => {
      if (!filter._added) {
        availableFilters.push(filter);
      }
    });
    this.filtersAvailableToAdd = availableFilters;
  }

  parentFun() {
    alert('parent component function.');
  }
}
