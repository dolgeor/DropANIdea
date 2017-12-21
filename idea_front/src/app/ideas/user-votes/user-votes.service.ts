import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { UserVote } from './user-votes'
import { Vote } from './votes/votes'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserVotesService {

  private url: string = "http://localhost:8080/ideas";

  constructor(private http: Http) { }

  getUserVotes(id): Observable<UserVote[]> {
    return this.http.get(this.getUserVotesUrlByIdeaId(id))
      .map(res => UserVote.parseUserVotes(res.json()));
  }

  createUserVote(id: number, uv: UserVote) {
    return this.http.post(this.url + "/" + id + "/user_votes", uv);
  }

  addVote(idea_id: number, user_vote_id: number, v: Vote) {
    return this.http.post(this.url + "/" + idea_id + "/user_votes/" + user_vote_id + "/votes", v);  //url
  }

  private getUserVotesUrlByIdeaId(id) {
    return this.url + "/" + id + "/user_votes";
  }
}
