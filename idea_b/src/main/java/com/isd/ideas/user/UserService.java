package com.isd.ideas.user;

import java.util.List;


public interface UserService {
    
    public void createUser(User user);
    
    public void updateUser(long id,User user);
         
    public void deleteUser(long id);
    
    public User findUserById(long id);
    
    public List<User> listUser();
}
