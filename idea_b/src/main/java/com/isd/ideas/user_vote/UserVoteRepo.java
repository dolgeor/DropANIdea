package com.isd.ideas.user_vote;

import com.isd.ideas.idea.Idea;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface UserVoteRepo extends CrudRepository<UserVote, Long>{
        UserVote findByVotingPersonAndIdea(String votingPreson,Idea idea);
        UserVote findByid(long id);
}
