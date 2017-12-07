package com.isd.ideas.role;

import com.isd.ideas.user.User;
import com.isd.ideas.user_vote.UserVote;
import java.util.List;
import java.util.Objects;
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

@Table(name = "role_t",
        uniqueConstraints = {
            @UniqueConstraint(columnNames = "id"),
            @UniqueConstraint(columnNames = "type")}
)
public class Role {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private long id;

    @Column(name = "type", unique = true, nullable = false)
    private String type;
    
    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
    private List<User> users;
    
    public void setUser(List<User> users) {
        this.users = users;
    }
    
    public List<User> getUsers() {
        return users;
    }

    public Role(long id, String type) {
        this.id = id;
        this.type = type;
    }
    public Role() {
       
    }
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return String.format("TYPE: %s ID: %d", type, id);
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 29 * hash + (int) (this.id ^ (this.id >>> 32));
        hash = 29 * hash + Objects.hashCode(this.type);
        hash = 29 * hash + Objects.hashCode(this.users);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Role other = (Role) obj;
        if (this.id != other.id) {
            return false;
        }
        if (!Objects.equals(this.type, other.type)) {
            return false;
        }
        if (!Objects.equals(this.users, other.users)) {
            return false;
        }
        return true;
    }
    
    
}
