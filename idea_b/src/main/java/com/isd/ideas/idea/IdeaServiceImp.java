package com.isd.ideas.idea;


import com.isd.ideas.user_vote.UserVote;
import com.isd.ideas.user_vote.UserVoteRepo;
import com.isd.ideas.vote.Vote;
import com.isd.ideas.vote.VoteRepo;
import java.math.BigInteger;

import java.sql.Date;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service("ideaService")
public class IdeaServiceImp implements IdeaService {

    @Autowired
    IdeaRepo repo;
    
    @Autowired
    UserVoteRepo repoUserVote;

    @Autowired
    VoteRepo repoVote;
    
    @PersistenceContext
    EntityManager em;
    
    private final JdbcTemplate jdbcTemplate;
    public IdeaServiceImp(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @Override
    public void createIdea(Idea idea) {

        System.out.println("Creating Idea : " + idea);
        if (repo.exists(idea.getId())) {
            throw new IdeaException("Idea with id " + idea.getId() + " already exists");
        }
        repo.save(idea);

    }

    @Override
    public void updateIdea(long id, Idea idea) {
        System.out.println("Updating Idea " + idea);

        Idea currentIdea = repo.findByid(id);

        if (currentIdea == null) {
            throw new IdeaException("Idea with id " + id + " not found");
        }
        
        currentIdea.setDate(idea.getDate());
        currentIdea.setText(idea.getText());
        currentIdea.setAuthor(idea.getAuthor());
        
        repo.save(currentIdea);

    }

    @Override
    public Idea findIdeaById(long id) {
        System.out.println("Fetching Idea with id " + id);
        if (!repo.exists(id)) {
            throw new IdeaException("There is no idea with id: " + id);
        }
        return (Idea) repo.findByid(id);
    }

    
    @Override
    public List<Idea> listIdeas() {
        List<Idea> list = (List<Idea>) repo.findAll();
        if (list.isEmpty()) {
            throw new IdeaException("There are no Ideas");
        }
        return list;
    }

    @Override
    public void deleteIdea(long id) {
        System.out.println("Fetching & Deleting Idea with id " + id);
        if (!repo.exists(id)) {
            throw new IdeaException("Unable to delete. Idea with id " + id + " not found");
        }
        repo.delete(id);

    }

    @Override
    public List<Idea> findIdeaByAuthor(String author) {
       System.out.println("Fetching Ideas created by " + author);
        List<Idea> ideas = repo.findByauthorIgnoreCase(author);
//        if (ideas.isEmpty()) {
//            throw new IdeaException("There are no Ideas created by " + author);
//        }
        return ideas; 
    }

    @Override
    public List<Idea> findByDate(Date date) {
        System.out.println("Fetching Ideas created at" + date);
        List<Idea> ideas = repo.findBydate(date);
//        if (ideas.isEmpty()) {
//            throw new IdeaException("There are no Ideas created at " + date);
//        }
        return ideas; 
    }

    ////UserVotes

    @Override
    public void addUserVote(long id, UserVote userVote) {
        Idea idea = findIdeaById(id);
        System.out.println("Creating UserVote for  idea: " + idea.getId());
        if (repoUserVote.exists(userVote.getId())) {
            throw new IdeaException("UserVote with id " + userVote.getId() + " already exists");
        }
        idea.getUserVotes().add(new UserVote(userVote, idea));
        repo.save(idea);
    }
    
    @Override
    public void addVote(long id, Vote vote) {
        
        System.out.println("Fetching USerVote with id " + id);
        if (!repoUserVote.exists(id)) {
            throw new IdeaException("There is no UserVote with id: " + id);
        }
        UserVote userVote = repoUserVote.findByid(id);
        

        System.out.println("Creating Vote for  UserVote: " + userVote.getId());
        if (repoVote.exists(vote.getId())) {
            throw new IdeaException("Vote with id " + vote.getId() + " already exists");
        }
        userVote.getVotes().add(new Vote(vote, userVote));

        repoUserVote.save(userVote);
    }
    
    @Override
    public List<UserVote> getUserVotesByIdeaId(long id) {
        List<UserVote> list = findIdeaById(id).getUserVotes();
        if (list.isEmpty()) {
            throw new IdeaException("There are no UserVotes for idea " + id);
        }
        return list;
    }

    ///Votes

    
    
    
    
    
    
    @Override
    public BigInteger countLikeDislike(long id, String string) {
        if (!(string.equals("like") || string.equals("dislike")))
            throw new IdeaException("Wrong adress!");
        boolean value = false;
        if (string.equals("like"))
            value = true;
        Query q = em.createNativeQuery("SELECT  COUNT(*) FROM user_vote_t  INNER  JOIN vote_t ON (user_vote_t.id = vote_t.user_vote_id) WHERE (user_vote_t.idea_id = :key) and (vote_t.like_dislike = :value)");
        q.setParameter("key", id);
        q.setParameter("value", value);
        BigInteger listLike = (BigInteger) q.getSingleResult();
        
        
        return listLike;
    }
 
    
      @Override
    public List<IdeaJson> listIdeasWithVote() {
        String sql = "select t.id as id, t.text as text, likes.likes as likes, dislikes.dislikes as dislikes, author, idea_date from (idea_t t left join (select idea_id, count(vote_t.id) as likes from vote_t inner join user_vote_t on user_vote_t.id = vote_t.user_vote_id where like_dislike = true group by user_vote_t.idea_id) as likes on t.id = likes.idea_id left join (select idea_id, count(vote_t.id) as dislikes from vote_t inner join user_vote_t on user_vote_t.id = vote_t.user_vote_id where like_dislike = false group by user_vote_t.idea_id) as dislikes on t.id = dislikes.idea_id)order by (coalesce(likes, 0) - coalesce(dislikes, 0)) desc, t.id desc";
        List <IdeaJson> listIdeas = jdbcTemplate.query(sql, new IdeaMapper());
        return listIdeas;
    }

    @Override
    public BigInteger isVotedAtDateByUserVote(long id, Date date) {
        Query q = em.createNativeQuery("SELECT CAST(CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END AS bigint) FROM vote_t where user_vote_id=:id AND vote_date=:date");
        q.setParameter("id", id);
        q.setParameter("date",date);
        return (BigInteger) q.getSingleResult();
    }
    
    

}
