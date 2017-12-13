import { Component, OnInit } from '@angular/core';
import {IdeasService} from "./ideas.service";
import {Idea} from "./ideas";
import { UserVote } from './user-votes/user-votes';
import {Vote} from './user-votes/votes/votes'
// import {UserVotesComponent} from './user-votes/user-votes.component'

//import {UserVotesService} from './user-votes/user-votes.service'
@Component({
  selector: 'idea-root',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.css']
})
export class IdeasComponent   implements OnInit {
      private ideas: Idea[] = [];
  
    
      
      constructor(private ideasService: IdeasService//,private userVotesService: UserVotesService
      ) { }
        
      ngOnInit() {
        this.getAllIdeas();
        
      }

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
      
      onClickGetById(val: string) {
        if(val == ''){
          this.getAllIdeas();
        }
        else{
          this.ideasService.getIdeaByAuthor(val).subscribe(data =>{ 
            this.ideas=data
            this.ideas.forEach(idea=>{
              
                            this.ideasService.getLikesDislikes(idea.id,"like").subscribe(num=>{
                              idea.likes = num;
                            });
              
                            this.ideasService.getLikesDislikes(idea.id,"dislike").subscribe(num=>{
                              idea.dislikes = num;
                            });
                          })
          });
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
      onClickLike(id){
      
        // let newUserVote= new UserVote("anon");
        // console.log(newUserVote)
        // this.ideasService.createUserVote(id,newUserVote).subscribe(data => {
        //     console.log('UserVote успешно добавлены'),

        //     this.getAllIdeas()
        //    });
        let vote= new Vote(new Date().toJSON().slice(0,10).replace(/-/g,'-'),true);
        console.log(vote)
        this.ideasService.addVote(id,3,vote)
        .subscribe(data => {
            console.log('Vote успешно добавлены'),
            
            this.getAllIdeas()
           });



      //  this.ideasService.createIdea(newIdea).subscribe(data => {
      //   console.log('Данные успешно добавлены'),
      //   this.getAllIdeas()
      //  });
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
            this.ideas.forEach(idea=>{

              this.ideasService.getLikesDislikes(idea.id,"like").subscribe(num=>{
                idea.likes = num;
              });

              this.ideasService.getLikesDislikes(idea.id,"dislike").subscribe(num=>{
                idea.dislikes = num;
              });
            })
            
          });
        
       
        
      
      
      }

      getIdeaById(val: number){
        this.ideasService.getIdea(val)
        .subscribe(data => this.ideas = new Array(data));
      }
      
    }