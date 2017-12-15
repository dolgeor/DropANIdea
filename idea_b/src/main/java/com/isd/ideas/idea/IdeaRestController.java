package com.isd.ideas.idea;


import com.google.appengine.repackaged.com.google.gson.Gson;
import com.isd.ideas.user_vote.UserVote;
import com.isd.ideas.user_vote.UserVoteService;
import com.isd.ideas.vote.Vote;
import com.isd.ideas.vote.VoteService;
import java.math.BigInteger;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.sql.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping(value = "/ideas")
@CrossOrigin(origins = {"http://localhost:4200"})
public class IdeaRestController {

    @Autowired
    IdeaService ideaService;

    @Autowired
    UserVoteService userVoteService;
    
    @Autowired
    VoteService voteService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<Idea>> listAllIdeas() {
        return ResponseEntity.ok(ideaService.listIdeas());
    }
    
      @RequestMapping(value = "/rate", method = RequestMethod.GET)
    public ResponseEntity<List<IdeaJson>> listAllIdeasWithVote() {
        return ResponseEntity.ok(ideaService.listIdeasWithVote());
    }
    
    
    
    @RequestMapping(params = "author", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Idea>> getIdeasByAuthor(@RequestParam("author") String author) {
        return ResponseEntity.ok(ideaService.findIdeaByAuthor(author));
    }

    @RequestMapping(params = "date", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Idea>> getIdeasByDate(@RequestParam("date") Date date) {
        return ResponseEntity.ok(ideaService.findByDate(date));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Idea> getIdea(@PathVariable("id") long id) {
        return ResponseEntity.ok(ideaService.findIdeaById(id));
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Void> createIdea(@RequestBody Idea idea)//, UriComponentsBuilder ucBuilder)
    {
        ideaService.createIdea(idea);
        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Idea> updateIdea(@PathVariable("id") long id, @RequestBody Idea idea) {
        ideaService.updateIdea(id, idea);
        return ResponseEntity.ok(idea);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Idea> deleteIdea(@PathVariable("id") long id) {
        ideaService.deleteIdea(id);
        return new ResponseEntity<Idea>(HttpStatus.NO_CONTENT);
    }

    ///UserVoteCOntroller
    @RequestMapping(value = "/{id}/user_votes", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<UserVote>> getUserVotesOfIdea(@PathVariable("id") long id) {
        return ResponseEntity.ok(ideaService.getUserVotesByIdeaId(id));
    }

    @RequestMapping(value = "/{id}/user_votes", params = "voted_by", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserVote> getUserVoteByIdeaAndByvotingPerson(@PathVariable("id") long id, @RequestParam("voted_by") String author) {
        Idea idea = ideaService.findIdeaById(id);
        return ResponseEntity.ok(userVoteService.findUserVoteByVotingPersonAndIdea(author, idea));
    }
    
    
    @RequestMapping(value = "/{id}/user_votes", params = "voted_by", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserVote> deleteByvotingPerson(@PathVariable("id") long id, @RequestParam("voted_by") String author) {
        Idea idea = ideaService.findIdeaById(id);
        userVoteService.deleteUserVote(userVoteService.findUserVoteByVotingPersonAndIdea(author, idea).getId());
        return new ResponseEntity<UserVote>(HttpStatus.NO_CONTENT);
    }
    
    @RequestMapping(value = "/{id}/user_votes", method = RequestMethod.POST)
    public ResponseEntity<Void> addUserVoteToIdea(@PathVariable("id") long id, @RequestBody UserVote userVote) {
        ideaService.addUserVote(id, userVote);
        return ResponseEntity.ok().build();
    }
    
        ///VoteCOntroller
    @RequestMapping(value = "/{ID}/user_votes/{id}/votes", method = RequestMethod.POST)
    public ResponseEntity<Void> addVoteToUserVote(@PathVariable("ID") long ID,@PathVariable("id") long id, @RequestBody Vote vote) {
        
        ideaService.addVote(id, vote);
        return ResponseEntity.ok().build();
    }
    
    
    
     private final static Gson gson = new Gson();
    
    
@RequestMapping(value = "/{id}/{value}", method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BigInteger> getUserVoteToIdea(@PathVariable("id") long id, @PathVariable("value") String value) {
//        Gson gson = new GsonBuilder().create();
//        List<Like> list = new ArrayList<>();
//        list.add(new Like(ideaService.countLikeDislike(id, value)));
//        
        return ResponseEntity.ok(ideaService.countLikeDislike(id, value));
       // return ResponseEntity.ok(gson.toJson( "likes:" + ideaService.countLikeDislike(id, value)));
    }
    
    class Like {
        BigInteger like;
        Like(BigInteger like){this.like = like;}
    }
}
