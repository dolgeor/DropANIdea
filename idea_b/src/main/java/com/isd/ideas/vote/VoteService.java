package com.isd.ideas.vote;

import java.sql.Date;
import java.util.List;


public interface VoteService {   
    public List<Vote> findVoteByVoteDate(Date voteDate);
    
    public void createVote(Vote vote);
}
