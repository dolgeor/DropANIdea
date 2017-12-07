package com.isd.ideas.user_vote;

import com.isd.ideas.idea.Idea;


public interface UserVoteService {

    public void deleteUserVote(long id);
    
    public UserVote findUserVoteByVotingPersonAndIdea(String votingPreson,Idea idea);

    
}
