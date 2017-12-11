import { Injectable } from '@angular/core';
import { Http,Response  } from '@angular/http';



import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import {Idea} from './ideas'

@Injectable()
export class IdeasService {

  private url: string = "http://localhost:8080/ideas";

  constructor(private http: Http) { }

  getIdeas():Observable<Idea[]>
  {
    return this.http.get(this.url)
    .map(res => Idea.parseIdeas(res.json()));
  }

 

  getIdea(id):Observable<Idea>
  {
    return this.http.get(this.getIdeaUrl(id))
      .map(res => Idea.parseIdea(res.json()));
  }

  createIdea(idea: Idea){
    return this.http.post(this.url, idea);  
  }

  getIdeaByAuthor(author: string): Observable<Idea[]> {
    return this.http.get(this.url +'?author='+author)
    .map(res => Idea.parseIdeas(res.json()));
  }

  // addIdea(idea: Idea):Observable<Idea>{
  //   let headers = new Headers ({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers, method: "post" });

  //   console.log(JSON.stringify(idea));
  //   return this.http.post(this.url,JSON.stringify(idea), options)
  //   .map(res => Idea.parseIdea(res.json()));
  // }

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
