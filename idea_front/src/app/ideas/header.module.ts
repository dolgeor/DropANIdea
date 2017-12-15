import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpModule }  from '@angular/http';

import { IdeasService } from "./ideas.service";
import { UserVotesModule } from './user-votes/user-votes.module';

import { HeaderComponent } from "./header.component";


@NgModule({
    imports: [
      CommonModule,
      HttpModule,
      UserVotesModule
    ],
    declarations: [
      HeaderComponent
    ],
    exports: [
      HeaderComponent
    ],
    providers: [
     IdeasService
    ]
  })
  export class HeaderModule { }