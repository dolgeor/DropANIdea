export class Vote {
    id: number
    voteDate: string
    like_dislike: boolean
    
    constructor(voteDate: string, like_dislike: boolean) {
       this.voteDate = voteDate
       this.like_dislike = like_dislike
    }
   
    static parseVotes(jsonData:any): Vote[] {

        let votes: Vote[] =[];
        for(let a of jsonData){
            votes.push(this.parseVote(a));
            //    new Idea( a.id, a.text, a.author, a.date));
        }
      //  console.log(votes)
        return votes;
    }

    static parseVote(a:any): Vote {
        let v = new Vote(a.voteDate, a.like_dislike);
        v.id = a.id;
        return v;
    }
       
   }
       

    