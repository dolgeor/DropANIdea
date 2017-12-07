package com.isd.ideas.user_vote;


import com.isd.ideas.idea.Idea;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("userVoteService")
public class UserVoteServiceImp implements UserVoteService {

    @Autowired
    UserVoteRepo repo;

    @Override
    public void deleteUserVote(long id) {
        System.out.println("Fetching & Deleting UserVote with id " + id);
        if (!repo.exists(id)) {
            throw new UserVoteException("Unable to delete. UserVote with id " + id + " not found");
        }
        repo.delete(id);

    }

    @Override
    public UserVote findUserVoteByVotingPersonAndIdea(String votingPreson, Idea idea) {
        System.out.println("Fetching UserVote of idea: " + idea.getId() + " voted by " + votingPreson);
        UserVote uv = repo.findByVotingPersonAndIdea(votingPreson, idea);
        if (!repo.exists(uv.getId())) {
            throw new UserVoteException(votingPreson + " doesn't voted for idea: " + idea.getId());
        }
        return uv;
    }

}
