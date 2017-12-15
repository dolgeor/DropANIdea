import { Injectable } from '@angular/core';
import { Http,Response  } from '@angular/http';

import { HttpParams} from '@angular/common/http';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import {Idea} from './ideas'
import {UserVote} from './user-votes/user-votes'
import {Vote} from './user-votes/votes/votes'
@Injectable()
export class IdeasService {

  private url: string = "http://localhost:8080/ideas";
 
  constructor(private http: Http) { }

  getIdeas():Observable<Idea[]>
  {
    return this.http.get(this.url)
    .map(res => Idea.parseIdeas(res.json()));
  }

  getSortedIdeasWithVotes():Observable<Idea[]>
  {
    return this.http.get(this.url +'/rate')
    .map(res => Idea.parseIdeasWithVotes(res.json()));
  }


  getLikesDislikes(id,type):Observable<number>{
    
    return this.http.get(this.url +'/' + id +"/"+type).map(res=>parseInt(res.text()));
  }
  
  getIdea(id):Observable<Idea>
  {
    return this.http.get(this.getIdeaUrl(id))
      .map(res => Idea.parseIdea(res.json()));
  }

  createIdea(idea: Idea){
    return this.http.post(this.url, idea);  
  }


  createUserVote(id:number,uv: UserVote){
    return this.http.post(this.url + "/" + id + "/user_votes", uv);
  }
  //////////////////////////
  addVote(idea_id:number, user_vote_id:number,v: Vote){
    return this.http.post(this.url + "/" + idea_id + "/user_votes/" + user_vote_id + "/votes", v);
  }

  getIdeaByAuthor(author: string): Observable<Idea[]> {
    return this.http.get(this.url +'?author='+author)
    .map(res => Idea.parseIdeas(res.json()));
  }

  updateIdea(id: number, idea: Idea) {
    console.log('puuuuut');
    console.log(idea);
    console.log(this.url + '/' + id);
    return this.http.put(this.url + '/' + id, idea);
  }

  deleteIdea(id: number)  {
    return this.http.delete(this.url + '/' + id);
  }

  // updateIdea(idea){
  //   return this.http.put(this.getIdeaUrl(idea.id), JSON.stringify(idea))
  //     .map(res => res.json());
  // }

  // deleteIdea(id){
  //   return this.http.delete(this.getIdeaUrl(id))
  //     .map(res => res.json());
  // }

  private getIdeaUrl(id){
    return this.url + "/" + id;
  }
}
