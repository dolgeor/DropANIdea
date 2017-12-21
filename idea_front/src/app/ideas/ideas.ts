import { UserVote } from './user-votes/user-votes';

export class Idea {

    id: number
    text: string
    author: string
    date: string
    likes: number
    dislikes: number
    userVotes: UserVote[]

    constructor(text: string, author: string, date: string) {
        this.text = text;
        this.author = author;
        this.date = date;
        this.likes = 0;
        this.dislikes = 0;
    }

    static parseIdeas(jsonData: any): Idea[] {
        let ideas: Idea[] = [];
        for (let a of jsonData) {
            ideas.push(this.parseIdea(a));
        }
        return ideas;
    }

    static parseIdea(a: any): Idea {
        let idea = new Idea(a.text, a.author, a.date);
        idea.id = a.id;
        idea.userVotes = UserVote.parseUserVotes(a.userVotes);
        return idea;
    }

    static parseIdeasWithVotes(jsonData: any): Idea[] {
        let ideas: Idea[] = [];
        for (let a of jsonData) {
            ideas.push(this.parseIdeaWithVotes(a));
        }
        return ideas;
    }

    static parseIdeaWithVotes(a: any): Idea {
        let idea = new Idea(a.text, a.author, a.date);
        idea.id = a.id;
        idea.likes = a.likes;
        idea.dislikes = a.dislikes;
        return idea;
    }
}


