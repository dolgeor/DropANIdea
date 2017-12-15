import { Component} from '@angular/core';
import {IdeasComponent} from "./ideas.component";

@Component({
  selector: 'header-root',
  templateUrl: './header.component.html'
  
})
export class HeaderComponent{
    title = 'Drop an Idea';
}