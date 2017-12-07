package com.isd.ideas.user;

import org.springframework.data.repository.CrudRepository;

public interface UserRepo extends CrudRepository<User, Long>{
	User findByid(long id);  
     
        User findBylogin(String login);
        
        void deleteUserById(long id);

}
