package com.isd.ideas.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.isd.ideas.idea.Idea;
import com.isd.ideas.role.Role;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
    
@Entity
@Table(name = "user_t",
        uniqueConstraints = {
            @UniqueConstraint(columnNames = "id"),
            @UniqueConstraint(columnNames = "login")
            
}
)
public class User {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private long id;
    
    @Column(name = "login", unique = true, nullable = false)
    private String login;
    
    @Column(name = "password", nullable = false)
    private String password;
    
    @Column(name = "enabled", nullable = false)
    private Boolean enabled;
    
    @ManyToOne
    @JsonIgnore
    private Role role;

    public User() {
    }

   public User(User user, Role role) {
        this.role = role;
        this.login = user.getLogin();
        this.password = user.getPassword();
        this.enabled = user.getEnabled();
    }

    public User(long id, long roleid, String login, String password, Boolean enabled) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.enabled = enabled;
    }
    
    public Role getRole() {
        return role;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    @Override
    public String toString() {
        return "User{" + "id=" + id + ", login=" + login + ", password=" + password + ", enabled=" + enabled + '}';
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 73 * hash + (int) (this.id ^ (this.id >>> 32));
        hash = 73 * hash + Objects.hashCode(this.login);
        hash = 73 * hash + Objects.hashCode(this.password);
        hash = 73 * hash + Objects.hashCode(this.enabled);
        hash = 73 * hash + Objects.hashCode(this.role);
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
        final User other = (User) obj;
        if (this.id != other.id) {
            return false;
        }
        if (!Objects.equals(this.login, other.login)) {
            return false;
        }
        if (!Objects.equals(this.password, other.password)) {
            return false;
        }
        if (!Objects.equals(this.enabled, other.enabled)) {
            return false;
        }
        if (!Objects.equals(this.role, other.role)) {
            return false;
        }
        return true;
    }
    
    
    
}
