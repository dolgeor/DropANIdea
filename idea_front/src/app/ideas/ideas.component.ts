import { Component, OnInit } from '@angular/core';
import {IdeasService} from "./ideas.service";
import {Idea} from "./ideas";



@Component({
  selector: 'idea-root',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.css']
})
export class IdeasComponent   implements OnInit {
      private ideas: Idea[] = [];
    
      constructor(private ideasService: IdeasService) { }
    
      ngOnInit() {
        this.ideasService.getIdeas()
          .subscribe(data => this.ideas = data);
      }
    
    
       
      
    
    }