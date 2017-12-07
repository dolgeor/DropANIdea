package com.isd.ideas.idea;

import java.util.List;
import com.isd.ideas.user_vote.UserVote;
import java.sql.Date;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity

@Table(name = "idea_t",
        uniqueConstraints = {
            @UniqueConstraint(columnNames = "id")}
)
public class Idea {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private long id;

    @Column(name = "text", nullable = false)
    private String text;

    @Column(name = "author", nullable = false)
    private String author;

    @Column(name = "idea_date", nullable = false)
    private Date date;

    @OneToMany(mappedBy = "idea", cascade = CascadeType.ALL)
    private List<UserVote> userVotes;

    public List<UserVote> getUserVotes() {
        return userVotes;
    }

    public void setUserVotes(List<UserVote> userVotes) {
        this.userVotes = userVotes;
    }

    public Idea() {
    }

    public Idea(String text, String author, Date date) {
        this.text = text;
        this.author = author;
        this.date = date;
    }

    public long getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Idea{" + "id=" + id + ", text=" + text + ", author=" + author + ", date=" + date + '}';
    }

    void vote(UserVote userVote) {
        this.userVotes.add(userVote);
    }

}
