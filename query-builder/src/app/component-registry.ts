import { MultiSelectComponent } from "./editors/multiselect/multiseselect.component";
import { SingleSelectComponent } from "./editors/singleselect/singleselect.component";

export const COMPONENT_REGISTRY= [{
  name: 'singleSelect',
  component: SingleSelectComponent,
  operators: []
}, {
  name: 'multiSelect',
  component: MultiSelectComponent,
  operators: []
}];