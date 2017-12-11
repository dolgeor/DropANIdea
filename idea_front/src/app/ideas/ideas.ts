export class Idea {

    text: string
    author: string
    date: string
   
    constructor(   text: string, author: string,  date: string) {
 
        this.text = text;
        this.author = author;
        this.date = date;
       }
   
    static parseIdeas(jsonData:any): Idea[] {

        let ideas: Idea[] =[];
        for(let a of jsonData){
            ideas.push(this.parseIdea(a));
            //    new Idea( a.id, a.text, a.author, a.date));
        }
        return ideas;
    }

    static parseIdea(a:any): Idea {
        return new Idea(a.text, a.author, a.date);
    }
       
   }
       

    