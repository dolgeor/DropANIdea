export class UserVote {
    id: number
    votingPerson: string
   
    constructor(votingPerson: string) {
        this.votingPerson = votingPerson
       }
   
    static parseUserVotes(jsonData:any): UserVote[] {

        let userVotes: UserVote[] =[];
        for(let a of jsonData){
            userVotes.push(this.parseUserVote(a));
        }
      //  console.log(userVotes)
        return userVotes;
    }

    static parseUserVote(a:any): UserVote {
        let uv = new UserVote(a.votingPerson);
        uv.id = a.id;
        return uv;
    }
       
   }
       

    