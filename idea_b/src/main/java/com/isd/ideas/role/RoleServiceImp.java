package com.isd.ideas.role;

import com.isd.ideas.idea.Idea;
import com.isd.ideas.user.UserService;
import com.isd.ideas.user.User;
import com.isd.ideas.user.UserRepo;
import com.isd.ideas.user_vote.UserVote;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("roleService")
public class RoleServiceImp implements RoleService {

    @Autowired
    RoleRepo repo;

    @Autowired
    UserRepo repoUser;

    @Autowired
    UserService userService;

    @Override
    public void createRole(Role role) {

        System.out.println("Creating Role : " + role);
        if ((Role) repo.findByid(role.getId()) != null || (Role) repo.findBytype(role.getType()) != null) {
            throw new IllegalArgumentException();
        }
        repo.save(role);

    }

    @Override
    public void updateRole(long id, Role role) {
        System.out.println("Updating Role " + role);

        Role currentRole = repo.findByid(id);

        if (currentRole == null) {
            throw new RoleException("Role with id " + id + " not found");
        }
        currentRole.setId(id);
        currentRole.setType(role.getType());
        repo.save(currentRole);

    }

    @Override
    public Role findRoleById(long id) {
        System.out.println("Fetching Role with id " + id);
        Role currentRole = (Role) repo.findByid(id);
        if (currentRole == null) {
            throw new RoleException("There is no role with id: " + id);
        }
        return currentRole;
    }

    @Override
    public List<Role> listRoles() {
        List<Role> list = (List<Role>) repo.findAll();
        if (list.isEmpty()) {
            throw new RoleException("There are no roles");
        }
        return list;
    }

    @Override
    public void deleteRole(long id) {
        System.out.println("Fetching & Deleting Role with id " + id);

        Role role = repo.findByid(id);
        if (role == null) {
            throw new RoleException("Unable to delete. Role with id " + id + " not found");
        }
        repo.delete(id);

    }

    @Override
    public void addUser(long id, User user) {
        Role role = findRoleById(id);
        System.out.println("Creating User for Role: " + role.getId());
        role.getUsers().add(new User(user, role));
        repo.save(role);
    }

    @Override
    public void deleteUserById(long id, long userId) {
        Role role = findRoleById(id);
        System.out.println("Deleting User for Role: " + role.getId());
        Optional<User> possibleUser = role.getUsers().stream()
                .filter(u -> u.getId() == userId).findAny();
        if (possibleUser.isPresent()) {
            User user = possibleUser.get();
            role.getUsers().remove(user);
            repoUser.delete(user);
        } else {
            throw new RoleException("There is no user with id: " + userId);
        }
    }

}
