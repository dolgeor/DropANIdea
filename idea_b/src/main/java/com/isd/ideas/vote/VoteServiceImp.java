package com.isd.ideas.vote;

import com.isd.ideas.idea.IdeaException;
import java.sql.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("VoteService")
public class VoteServiceImp implements VoteService {

    @Autowired
    VoteRepo repo;

    @Override
    public List<Vote> findVoteByVoteDate(Date date) {
    System.out.println("Fetching Votes from " + date);
    List<Vote> votes = (List<Vote>) repo.findByVoteDate(date);
        if (votes.isEmpty()) {
            throw new IdeaException("Nobody voted at " + date);
        }
        return votes;
    }

    @Override
    public void createVote(Vote vote) {

        System.out.println("Creating Vote : " + vote);
        if (repo.exists(vote.getId())) {
            throw new IdeaException("Vote with id " + vote.getId() + " already exists");
        }
        repo.save(vote);

    }
    }

    

   

