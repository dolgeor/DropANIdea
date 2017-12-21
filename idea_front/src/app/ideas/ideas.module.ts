import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpModule }  from '@angular/http';

import { IdeasComponent } from "./ideas.component";
import { IdeasService } from "./ideas.service";
import { UserVotesModule } from './user-votes/user-votes.module';

import { HeaderComponent } from "./header.component";


import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
    imports: [
      CommonModule,
      HttpModule,
      UserVotesModule,

      SimpleNotificationsModule.forRoot()
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