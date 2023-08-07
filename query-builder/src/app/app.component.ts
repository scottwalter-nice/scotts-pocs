import { Component, inject } from '@angular/core';
import { PopoverService } from './popover/PopoverService';
import { COMPONENT_REGISTRY } from './component-registry';
@Component({
  selector: 'app-root',
  template: `
    <app-querybuilder [queryComponentDefinitions]="queryComponents" [model]="model"></app-querybuilder>

  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /*
  model = [
    {
      filterId: 'teams',
      selectedValue: 100
    },
    {
      filterId: 'users',
      selectedValue: 200
    }

  ];
  */
  model = [];

  queryComponents = [
    {
      // id: 0,
      id: 'teams',
      componentName: 'singleSelect',
      description: 'Teams',
      componentConfig: {
        items: [
          { value: 'a1a1a1', label: 'Team A' },
          { value: 'b2b2b2', label: 'Team B' },
          { value: 'c3c3c3', label: 'Team C' }
        ]
      }
    },
    {
      // id: 1,
      id: 'users',
      componentName: 'multiSelect',
      description: 'Users'
    }
  ];
}
