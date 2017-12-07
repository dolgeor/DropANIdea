package com.isd.ideas.user;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserServiceImp implements UserService {

    @Autowired
    UserRepo repo;

    @Override
    public void createUser(User user) {
        System.out.println("Creating User : " + user);
        String login = user.getLogin();
        if (repo.findBylogin(user.getLogin()) != null) {
            throw new UserException("User with login " + login + " already exists");
        }
        repo.save(user);
    }

    @Override
    public void updateUser(long id, User user) {
        System.out.println("Updating User " + user);

        User currentUser = repo.findByid(id);

        if (currentUser == null) {
            throw new UserException("User with id " + id + " not found");
        }
        currentUser.setLogin(user.getLogin());
        currentUser.setPassword(user.getPassword());
        currentUser.setEnabled(user.getEnabled());
        repo.save(currentUser);

    }

    @Override
    public User findUserById(long id) {
        System.out.println("Fetching User with id " + id);
        if (!repo.exists(id)) {
            throw new UserException("There is no user with id: " + id);
        }
        return repo.findByid(id);
    }

    @Override
    public List<User> listUser() {
        List<User> list = (List<User>) repo.findAll();
        if (list.isEmpty()) {
            throw new UserException("There are no users");
        }
        return list;
    }

    @Override
    public void deleteUser(long id) {
        System.out.println("Fetching & Deleting User with id " + id);

        if (!repo.exists(id)) {
            throw new UserException("Unable to delete. User with id " + id + " not found");
        }
        repo.delete(id);
    }

}
