package com.isd.ideas.vote;

import java.sql.Date;
import org.springframework.data.repository.CrudRepository;

public interface VoteRepo extends CrudRepository<Vote, Long>{
        Vote findByVoteDate(Date voteDate);
        
}
