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
        this.getAllIdeas();
      }

      // onClickGetById(val: string) {
      //   if(val == ''){
      //     this.getAllIdeas();
      //   }
      //   else{
      //     this.getIdeaById(parseInt(val));
      //   }
      // }
      
      onClickGetById(val: string) {
        if(val == ''){
          this.getAllIdeas();
        }
        else{
          this.ideasService.getIdeaByAuthor(val).subscribe(data => this.ideas=data);
        }
      }


      onClickedAdd(author, text){
        let newIdea = new Idea(text,author,new Date().toJSON().slice(0,10).replace(/-/g,'-'))
       console.log(newIdea)
       this.ideasService.createIdea(newIdea).subscribe(data => {
        console.log('Данные успешно добавлены'),
        this.getAllIdeas()
       });
      }
      getAllIdeas(){
        this.ideasService.getIdeas()
        .subscribe(data => this.ideas=data);
      }

      getIdeaById(val: number){
        this.ideasService.getIdea(val)
        .subscribe(data => this.ideas = new Array(data));
      }
      
    }