import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpModule }  from '@angular/http';

import { IdeasComponent } from "./ideas.component";
import { IdeasService } from "./ideas.service";

@NgModule({
    imports: [
      CommonModule,
      HttpModule
    ],
    declarations: [
        IdeasComponent
    ],
    exports: [
      IdeasComponent
    ],
    providers: [
     IdeasService
    ]
  })
  export class IdeasModule { }