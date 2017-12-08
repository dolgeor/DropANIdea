import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class IdeasService {

  private url: string = "http://localhost:8080/ideas";

  constructor(private http: Http) { }

  getIdeas(){
    return this.http.get(this.url)
      .map(res => res.json());
  }

  getIdea(id){
    return this.http.get(this.getIdeaUrl(id))
      .map(res => res.json());
  }

  addIdea(idea){
    return this.http.post(this.url, JSON.stringify(idea))
      .map(res => res.json());
  }

  updateIdea(idea){
    return this.http.put(this.getIdeaUrl(idea.id), JSON.stringify(idea))
      .map(res => res.json());
  }

  deleteIdea(id){
    return this.http.delete(this.getIdeaUrl(id))
      .map(res => res.json());
  }

  private getIdeaUrl(id){
    return this.url + "/" + id;
  }
}
