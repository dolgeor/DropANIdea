import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { IdeasModule } from './ideas/ideas.module';
import { HeaderModule } from './ideas/header.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IdeasModule,
    HeaderModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
