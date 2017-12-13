import { Component } from '@angular/core';
import {UserVotesService} from "./user-votes.service";
import {UserVote} from "./user-votes";



@Component({
  selector: 'user-vote-root',
  templateUrl: './user-votes.component.html',
  styleUrls: ['./user-votes.component.css']
})
export class UserVotesComponent    {
      // private userVotes: UserVote[] = [];
    
      // constructor(private userVotesService: UserVotesService) { }
      // public getUserVotes(id):UserVote[]{
      //   this.getAllUserVotes(id);
      //   return this.userVotes;
      // }


      // getAllUserVotes(id){
      //   this.userVotesService.getUserVotes(id)
      //   .subscribe(data => this.userVotes=data);
      // }
      // ngOnInit() {
      //   this.getAllUserVotes();
      // }

      // onClickGetById(val: string) {
      //   if(val == ''){
      //     this.getAllIdeas();
      //   }
      //   else{
      //     //this.getIdeaById(parseInt(val));
      //     this.ideasService.deleteIdea(parseInt(val)).subscribe(
      //         data => {
      //         console.log('Данные успешно удалены'),
      //         this.getAllIdeas()
      //        });
         
      //   }
      // }
      
      // onClickGetById(val: string) {
      //   if(val == ''){
      //     this.getAllIdeas();
      //   }
      //   else{
      //     this.ideasService.getIdeaByAuthor(val).subscribe(data => this.ideas=data);
      //   }
      // }


      // onClickedAdd(author, text){
      //   let newIdea = new Idea(text,author,new Date().toJSON().slice(0,10).replace(/-/g,'-'))
      //  console.log(newIdea)
      //  this.ideasService.createIdea(newIdea).subscribe(data => {
      //   console.log('Данные успешно добавлены'),
      //   this.getAllIdeas()
      //  });
      // }

      // onClickedAdd(author, text){
      //   let newIdea = new Idea(text,author,new Date().toJSON().slice(0,10).replace(/-/g,'-'))
      // //  console.log(newIdea)
      //  this.ideasService.updateIdea(31,newIdea).subscribe(data => {
      //   console.log('Данные успешно добавлены'),
      //   this.getAllIdeas()
      //  });
      // }



      
      
    }