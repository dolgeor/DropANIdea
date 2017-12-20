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
      private pages: number[] = [];
      private currentPage = 1;
      private findBYAuth = false;

      constructor(private ideasService: IdeasService ) { 
        setInterval(() => {
          console.log('refresh')
          if(this.findBYAuth){
            this.getVotesForAllIdeas()
          }else{
            this.getAllIdeasWithVotes()
          }
        }, 1000 * 2);///refresh data
        
        
      }
        

      ngOnInit() {
        this.getAllIdeasWithVotes();
    //    this.ideasService.getUserIP().subscribe(data => {console.log(data)})
        
      }




      
      getAllIdeas(){
        this.ideasService.getIdeas()
        .subscribe(data => 
          {
            this.ideas=data;
            this.getVotesForAllIdeas();
          });
      }

      getAllIdeasWithVotes(){
        this.findBYAuth = false;
        this.ideasService.getSortedIdeasWithVotes()
        .subscribe(data => 
          { 
            this.pages= new Array(Math.trunc((data.length + 9) / 10));
            for (var _i = 0; _i < this.pages.length; _i++) {
              this.pages[_i] = _i + 1;
            }
            //console.log('cp =  ' + this.currentPage)
            this.ideas = data.slice(10 * this.currentPage - 10 , 10 * this.currentPage)
            //console.log(this.ideas.length)
          });
      }
      setPage(page){
        this.currentPage = page;
        this.getAllIdeasWithVotes();
      }
      setNextPage(){
        if(this.currentPage < this.pages.length)
           this.currentPage++;
        this.getAllIdeasWithVotes();
      }
      setPrevPage(){
        if(this.currentPage > 1)
          this.currentPage--;
        this.getAllIdeasWithVotes();
      }

      
      onClickGetByAuthorName(val: string) {
        if(val == ''){
         // this.getAllIdeas();
         this.getAllIdeasWithVotes();
        }
        else{
          this.findBYAuth = true;
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
        this.onClickGetByAuthorName(author);
       });
      }

      
      onClickLike(id){

        this.ideasService.getIdea(id).subscribe(data =>{
          var IP;
          this.ideasService.getUserIP()
            .subscribe(IP => {
              this.ideasService.getUserVoteByVoter(id,IP).subscribe(uv =>{
                if(uv){
                  this.addNewVote(id,IP,true);
                }else{
                  this.ideasService.createUserVote(id, new UserVote(IP))
                  .subscribe(res => {
                    console.log('UserVote успешно добавлены' + id);
                    this.addNewVote(id,IP,true);
                  });
                }
              });
              
            });

        });
        
      }

      onClickDislike(id){
        
                this.ideasService.getIdea(id).subscribe(data =>{
                  var IP;
                  this.ideasService.getUserIP()
                    .subscribe(IP => {
                      this.ideasService.getUserVoteByVoter(id,IP).subscribe(uv =>{
                        if(uv){
                          this.addNewVote(id,IP,false);
                        }else{
                          this.ideasService.createUserVote(id, new UserVote(IP))
                          .subscribe(res => {
                            console.log('UserVote успешно добавлены ' + id);
                            this.addNewVote(id,IP,false);
                          });
                        }
                      });
                      
                    });
        
                });
                
              }
      // onClickDislike(id){
      //   this.ideasService.getIdea(id).subscribe(
      //     data => { 
      //       if(data.userVotes.length == 0){
      //         this.ideasService.getUserIP()
      //         .subscribe(data => {
              
      //             this.ideasService.createUserVote(id, new UserVote(data))
      //           .subscribe(res => {
      //                   console.log('UserVote успешно добавлены' + id) ,
      //                   this.addNewVote(id,false);
      //                 });});
      //     }else{
      //       this.addNewVote(id,false);
      //     }
      //   });
      // }

      addNewVote(id,voter,type:boolean){
        this.ideasService.getIdea(id).subscribe(
          data => {
            let vote= new Vote(new Date().toJSON().slice(0,10).replace(/-/g,'-'),type);
            
            this.ideasService.getUserVoteByVoterAndIdea(id,voter).subscribe(uv_id=>{
              this.ideasService.isVotedAtDateByUserVote(id,uv_id.id,vote.voteDate).subscribe(is =>{
                if(is == 1){
                  alert("You have voted for this idea today");
                }else{
                  this.ideasService.addVote(id,uv_id.id,vote)
                  .subscribe(res => {
                      console.log('Vote успешно добавлены dlea uv_id ' + uv_id.id )
                      this.getVotesForAllIdeas()  
                  });
                }
                });
            })
           
            


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
  

      getIdeaById(val: number){
        this.ideasService.getIdea(val)
        .subscribe(data => this.ideas = new Array(data));
      }
      
    }