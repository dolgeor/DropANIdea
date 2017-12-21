import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { UserVotesComponent } from "./user-votes.component";
import { UserVotesService } from "./user-votes.service";

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [
    UserVotesComponent
  ],
  exports: [
    UserVotesComponent
  ],
  providers: [
    UserVotesService
  ]
})

export class UserVotesModule { }