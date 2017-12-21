import { Component, OnInit, transition } from '@angular/core';
import { IdeasService } from "./ideas.service";
import { Idea } from "./ideas";
import { UserVote } from './user-votes/user-votes';
import { Vote } from './user-votes/votes/votes'
import { UserVotesService } from './user-votes/user-votes.service'
import { NotificationsService } from 'angular2-notifications'

@Component({
  selector: 'idea-root',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.css']
})

export class IdeasComponent implements OnInit {

  private ideas: Idea[] = [];
  private pages: number[] = [];
  private currentPage = 1;
  private findBYAuth = false;
  private errorMSG = false;
  private errorText = false;
  private errorAuthor = false;
  public options = {
    position: ["top", "right"],
    timeOut: 5000
  }

  constructor(private ideasService: IdeasService, private _service: NotificationsService) {
    setInterval(() => {
      if (this.findBYAuth) {
        this.getVotesForAllIdeas()
      } else {
        this.getAllIdeasWithVotes()
      }
    }, 1000 * 2);
  }

  ngOnInit() {
    this.getAllIdeasWithVotes();
  }

  getAllIdeas() {
    this.ideasService.getIdeas()
      .subscribe(data => {
        this.ideas = data;
        this.getVotesForAllIdeas();
      });
  }

  getAllIdeasWithVotes() {
    this.errorMSG = false;
    this.findBYAuth = false;
    this.ideasService.getSortedIdeasWithVotes()
      .subscribe(data => {
        this.pages = new Array(Math.trunc((data.length + 9) / 10));
        for (var _i = 0; _i < this.pages.length; _i++) {
          this.pages[_i] = _i + 1;
        }
        this.ideas = data.slice(10 * this.currentPage - 10, 10 * this.currentPage)
      });
  }

  setPage(page) {
    this.errorAuthor = false;
    this.errorText = false;
    this.currentPage = page;
    this.getAllIdeasWithVotes();
  }

  setNextPage() {
    this.errorAuthor = false;
    this.errorText = false;
    if (this.currentPage < this.pages.length)
      this.currentPage++;
    this.getAllIdeasWithVotes();
  }

  setPrevPage() {
    this.errorAuthor = false;
    this.errorText = false;
    if (this.currentPage > 1)
      this.currentPage--;
    this.getAllIdeasWithVotes();
  }

  onClickGetByAuthorName(val: string) {
    this.errorAuthor = false;
    this.errorText = false;
    if (val == '') {
      this.getAllIdeasWithVotes();
    }
    else {
      this.findBYAuth = true;
      this.errorMSG = false;
      this.ideasService.getIdeaByAuthor(val).subscribe(data => {
        this.ideas = data
        if (this.ideas.length == 0) {
          this.errorMSG = true;
        }
        this.getVotesForAllIdeas()
      })
    }
  }

  getVotesForAllIdeas() {
    var nrVotes = this.ideas.length;
    this.ideas.forEach(idea => {
      this.ideasService.getLikesDislikes(idea.id, "like").subscribe(num => {
        idea.likes = num;
      });
      this.ideasService.getLikesDislikes(idea.id, "dislike").subscribe(num => {
        idea.dislikes = num;
        if (nrVotes == 1) {
          this.ideas.sort((a, b) => {
            return (b.likes - b.dislikes) - (a.likes - a.dislikes)
          });
        }
        nrVotes--;
      });
    });
  }


  onClickedAdd(author, text) {
    this.errorAuthor = false;
    this.errorText = false;
    if (!author) {
      this.errorAuthor = true;
    }
    if (!text) {
      this.errorText = true;
    }
    if (author && text) {
      let newIdea = new Idea(text, author.trim(), new Date().toJSON().slice(0, 10).replace(/-/g, '-'))
      this.ideasService.createIdea(newIdea).subscribe(data => {
        this._service.success(
          '',
          'Idea is successfully added',
          {
            timeOut: 3000,
            showProgressBar: false,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 10
          }
        ),
          this.onClickGetByAuthorName(author);
      });
    }
  }


  onClickLike(id) {
    this.ideasService.getIdea(id).subscribe(data => {
      var IP;
      this.ideasService.getUserIP()
        .subscribe(IP => {
          this.ideasService.getUserVoteByVoter(id, IP).subscribe(uv => {
            if (uv) {
              this.addNewVote(id, IP, true);
            } else {
              this.ideasService.createUserVote(id, new UserVote(IP))
                .subscribe(res => {
                  this.addNewVote(id, IP, true);
                });
            }
          });
        });
    });
  }

  onClickDislike(id) {
    this.ideasService.getIdea(id).subscribe(data => {
      var IP;
      this.ideasService.getUserIP()
        .subscribe(IP => {
          this.ideasService.getUserVoteByVoter(id, IP).subscribe(uv => {
            if (uv) {
              this.addNewVote(id, IP, false);
            } else {
              this.ideasService.createUserVote(id, new UserVote(IP))
                .subscribe(res => {
                  this.addNewVote(id, IP, false);
                });
            }
          });
        });
    });
  }

  addNewVote(id, voter, type: boolean) {
    this.errorAuthor = false;
    this.errorText = false;
    this.ideasService.getIdea(id).subscribe(
      data => {
        let vote = new Vote(new Date().toJSON().slice(0, 10).replace(/-/g, '-'), type);
        this.ideasService.getUserVoteByVoterAndIdea(id, voter).subscribe(uv_id => {
          this.ideasService.isVotedAtDateByUserVote(id, uv_id.id, vote.voteDate).subscribe(is => {
            if (is == 1) {
              this._service.info(
                '',
                'You have voted for this idea today',
                {
                  timeOut: 3000,
                  showProgressBar: false,
                  pauseOnHover: false,
                  clickToClose: true,
                  maxLength: 10
                }
              )
            } else {
              this.ideasService.addVote(id, uv_id.id, vote)
                .subscribe(res => {
                  this.getVotesForAllIdeas()
                });
            }
          });
        })
      });
  }

  getIdeaById(val: number) {
    this.ideasService.getIdea(val)
      .subscribe(data => this.ideas = new Array(data));
  }
}