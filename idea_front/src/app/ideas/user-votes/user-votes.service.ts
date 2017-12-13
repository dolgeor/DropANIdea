import { Injectable } from '@angular/core';
import { Http,Response  } from '@angular/http';

import { HttpParams} from '@angular/common/http';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import {UserVote} from './user-votes'
import {Vote} from './votes/votes'
@Injectable()
export class UserVotesService {

  private url: string = "http://localhost:8080/ideas";

  constructor(private http: Http) { }

  getUserVotes(id):Observable<UserVote[]>
  {
    
    return this.http.get(this.getUserVotesUrlByIdeaId(id))
    .map(res => UserVote.parseUserVotes(res.json()));
  }

 
  createUserVote(id:number,uv: UserVote){
    return this.http.post(this.url + "/" + id + "/user_votes", uv);  //url
  }

  addVote(idea_id:number, user_vote_id:number,v: Vote){
    return this.http.post(this.url + "/" + idea_id + "/user_votes/" + user_vote_id + "/votes", v);  //url
  }
  // getUserVote(id):Observable<UserVote>
  // {
  //   return this.http.get(this.getUserVoteUrl(id))//url
  //     .map(res => UserVote.parseUserVote(res.json()));
  // }

  // createUserVote(idea: UserVote){
  //   return this.http.post(this.url, idea);  //url
  // }

  // getUserVoteByAuthor(author: string): Observable<Idea[]> {
  //   return this.http.get(this.url +'?author='+author)
  //   .map(res => UserVote.parseIdeas(res.json()));
  // }

  // updateIdea(id: number, idea: Idea) {
  //   console.log('puuuuut');
  //   console.log(idea);
  //   console.log(this.url + '/' + id);
  //   return this.http.put(this.url + '/' + id, idea);
  // }

  // deleteUserVote(id: number)  {
  //   return this.http.delete(this.url + '/' + id);
  // }

  // updateIdea(idea){
  //   return this.http.put(this.getIdeaUrl(idea.id), JSON.stringify(idea))
  //     .map(res => res.json());
  // }

  // deleteIdea(id){
  //   return this.http.delete(this.getIdeaUrl(id))
  //     .map(res => res.json());
  // }

  private getUserVotesUrlByIdeaId(id){
    return this.url + "/" + id + "/user_votes";
  }
}
