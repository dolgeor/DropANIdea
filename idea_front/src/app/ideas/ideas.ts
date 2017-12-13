// import { UserVote  } from './user-votes/user-votes';

export class Idea {
    id: number
    text: string
    author: string
    date: string
    likes: number
    dislikes:number
    // userVotes: UserVote[]
   
    constructor( text: string, author: string,  date: string
        // , userVotes: UserVote[]
    ) {
        this.text = text;
        this.author = author;
        this.date = date;
        this.likes = 0;
        this.dislikes = 0;
        // this.userVotes = userVotes;
       }
   
    static parseIdeas(jsonData:any): Idea[] {
      //  console.log(jsonData);
        let ideas: Idea[] =[];
        for(let a of jsonData){
            ideas.push(this.parseIdea(a));
            //    new Idea( a.id, a.text, a.author, a.date));
        }
      //  console.log(ideas);
        return ideas;
    }

    static parseIdea(a:any): Idea {
        let idea = new Idea(a.text, a.author, a.date//,a.userVotes
        );
        idea.id = a.id;
        
        return idea;
    }
       
   }
       

    