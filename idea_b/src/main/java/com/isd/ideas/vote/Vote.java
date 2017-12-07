package com.isd.ideas.vote;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.isd.ideas.user_vote.UserVote;
import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;


@Entity
@Table(name = "vote_t",
        uniqueConstraints = {
            @UniqueConstraint(columnNames = "id")})
public class Vote {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private long id;

    @Column(name = "vote_date", nullable = false)
    private Date voteDate;

    @Column(name = "like_dislike")
    private Boolean like_dislike;

    @ManyToOne
    @JsonIgnore
    UserVote userVote;

    public Vote() {
    }

    public Vote(Vote vote, UserVote userVote) {
        this.voteDate = vote.voteDate;
        this.like_dislike = vote.like_dislike;
        this.userVote = userVote;
    }

    public long getId() {
        return id;
    }

    public Date getVoteDate() {
        return voteDate;
    }

    public void setVoteDate(Date voteDate) {
        this.voteDate = voteDate;
    }

    public Boolean getLike_dislike() {
        return like_dislike;
    }

    public void setLike_dislike(Boolean like_dislike) {
        this.like_dislike = like_dislike;
    }

    public UserVote getUserVote() {
        return userVote;
    }

 

    

    @Override
    public String toString() {
        return "Vote{" + "date=" + voteDate + ", like_dislike=" + like_dislike + ", vote_id=" + userVote.getId() + '}';
    }

}
