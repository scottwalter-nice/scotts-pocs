import { Component, inject } from '@angular/core';
import { PopoverService } from './popover/PopoverService';
import { COMPONENT_REGISTRY } from './component-registry';
@Component({
  selector: 'app-root',
  template: `
    <app-querybuilder [queryComponentDefinitions]="queryComponents"></app-querybuilder>

  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  queryComponents = [
    {
      id: 0,
      componentName: 'singleSelect',
      description: 'Teams',
      componentConfig: {
        items: []
      }
    },
    {
      id: 1,
      key: "users",
      componentName: 'multiSelect',
      description: 'Users'
    }
  ];
}
