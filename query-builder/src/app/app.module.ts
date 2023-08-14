import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { AppComponent } from './app.component';
import { SingleSelectComponent } from './editors/singleselect/singleselect.component';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './popover/popover.component';
import { QuerybuilderComponent } from './querybuilder/querybuilder.component';
import { FormsModule } from '@angular/forms';
import { QuerychipComponent } from './querychip/querychip.component';
import { MultiSelectComponent } from './editors/multiselect/multiseselect.component';
import { TimestampGeneratorComponent } from './editors/timestamp-generator/timestamp-generator.component';
import { DropdownModule } from 'nice-solaris-ngx/dropdown';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    SingleSelectComponent,
    MultiSelectComponent,
    TimestampGeneratorComponent,
    PopoverComponent,
    QuerybuilderComponent,
    QuerychipComponent
  ],
  imports: [
    BrowserModule,
    OverlayModule,
    PortalModule,
    CommonModule,
    FormsModule,
    DropdownModule,
    MatMenuModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
