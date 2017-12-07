package com.isd.ideas.user_vote;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.isd.ideas.idea.Idea;
import com.isd.ideas.vote.Vote;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "user_vote_t",
        uniqueConstraints = {
            @UniqueConstraint(columnNames = "id")}
)
public class UserVote {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private long id;

    @Column(name = "voter", nullable = false)
    private String votingPerson;

    
    
    
    @ManyToOne
  //  @JoinColumn(name = "idea_id")
    @JsonIgnore
    private Idea idea;

    public Idea getIdea() {
        return idea;
    }
    
    @OneToMany(mappedBy = "userVote", cascade = CascadeType.ALL)
    private List<Vote> votes;

    public List<Vote> getVotes() {
        return votes;
    }

    public void setVotes(List<Vote> votes) {
        this.votes = votes;
    }

    
    
    

    public UserVote() {
    }
    
    public UserVote(UserVote userVote, Idea idea) {
        this.votingPerson = userVote.votingPerson;
        this.idea = idea;
    }
    
    
    

    public long getId() {
        return id;
    }

    public String getVotingPerson() {
        return votingPerson;
    }

    public void setVotingPerson(String votingPerson) {
        this.votingPerson = votingPerson;
    }

    @Override
    public String toString() {
        return "UserVote{" + "id=" + id + ", votingPerson=" + votingPerson + ", idea_id=" + idea.getId() + '}';
    }



    

}
