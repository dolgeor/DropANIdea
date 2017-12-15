import { Component, OnInit } from '@angular/core';
import {IdeasService} from "./ideas.service";
import {Idea} from "./ideas";
import { UserVote } from './user-votes/user-votes';
import {Vote} from './user-votes/votes/votes'
// import {UserVotesComponent} from './user-votes/user-votes.component'

import {UserVotesService} from './user-votes/user-votes.service'
@Component({
  selector: 'idea-root',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.css']
})
export class IdeasComponent   implements OnInit {

      private ideas: Idea[] = [];

      constructor(private ideasService: IdeasService ) { 
      //   setInterval(() => {this.getVotesForAllIdeas()}, 1000 * 2);///refresh data
      }
        

      ngOnInit() {
        this.getAllIdeasWithVotes();
        
      }


      getAllIdeasWithVotes(){
        this.ideasService.getSortedIdeasWithVotes()
        .subscribe(data => 
          {
            this.ideas=data;
            console.log(data)
          });
      }
      
      onClickGetByAuthorName(val: string) {
        if(val == ''){
          this.getAllIdeasWithVotes();
        }
        else{
          this.ideasService.getIdeaByAuthor(val).subscribe(data =>{ 
            this.ideas=data
            this.getVotesForAllIdeas()
          });
        }
      }

      getVotesForAllIdeas(){
        
        var nrVotes = this.ideas.length;
        this.ideas.forEach(idea=>{
         
          
          this.ideasService.getLikesDislikes(idea.id,"like").subscribe(num=>{
            idea.likes = num;
          });
        
          this.ideasService.getLikesDislikes(idea.id,"dislike").subscribe(num=>{
              idea.dislikes = num;

              //console.log(nrVotes)
              if(nrVotes == 1){
                this.ideas.sort((a, b)=> {
                //   console.log( b.likes +'    '+ a.likes);
                return  (b.likes - b.dislikes) - (a.likes - a.dislikes)});
              }
              nrVotes--;
              // console.log('ratinglikes = ' + rating)
              // rating -= idea.dislikes;
              // console.log('ratingdislikes = ' + rating)

          });     
              
      });

      }


      onClickedAdd(author, text){
        let newIdea = new Idea(text,author,new Date().toJSON().slice(0,10).replace(/-/g,'-'))
       this.ideasService.createIdea(newIdea).subscribe(data => {
        console.log('Данные успешно добавлены'),
        this.getAllIdeasWithVotes();
       });
      }

      
      onClickLike(id){
        this.ideasService.getIdea(id).subscribe(
          data => { 
            if(data.userVotes.length == 0){
              this.ideasService.createUserVote(id, new UserVote("anon"))
                .subscribe(res => {
                        console.log('UserVote успешно добавлены' + id) ,
                        this.addNewVote(id,true);
                 });
          }else{
            this.addNewVote(id,true);
          }
        });
      }

      onClickDislike(id){
        this.ideasService.getIdea(id).subscribe(
          data => { 
            if(data.userVotes.length == 0){
              this.ideasService.createUserVote(id, new UserVote("anon"))
                .subscribe(res => {
                        console.log('UserVote успешно добавлены' + id) ,
                        this.addNewVote(id,false);
                 });
          }else{
            this.addNewVote(id,false);
          }
        });
      }

      addNewVote(id,type:boolean){
        console.log(type);
        this.ideasService.getIdea(id).subscribe(
          data => {
            let vote= new Vote(new Date().toJSON().slice(0,10).replace(/-/g,'-'),type);
            let uv_id = data.userVotes[data.userVotes.length -1].id;
            
            this.ideasService.addVote(id,uv_id,vote)
            .subscribe(res => {
                console.log('Vote успешно добавлены dlea uv_id ' + uv_id )
                this.getVotesForAllIdeas()  
            });


          });
      }

      // onClickedAdd(author, text){
      //   let newIdea = new Idea(text,author,new Date().toJSON().slice(0,10).replace(/-/g,'-'))
      // //  console.log(newIdea)
      //  this.ideasService.updateIdea(31,newIdea).subscribe(data => {
      //   console.log('Данные успешно добавлены'),
      //   this.getAllIdeas()
      //  });
      // }

      // uvc:UserVotesComponent;
  
      getAllIdeas(){
        this.ideasService.getIdeas()
        .subscribe(data => 
          {
            this.ideas=data;
            this.getVotesForAllIdeas();
          });
      }

      getIdeaById(val: number){
        this.ideasService.getIdea(val)
        .subscribe(data => this.ideas = new Array(data));
      }
      
    }