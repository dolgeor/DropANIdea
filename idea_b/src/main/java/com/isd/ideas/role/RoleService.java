package com.isd.ideas.role;

import com.isd.ideas.user.User;
import java.util.List;


interface RoleService {
    
    public void createRole(Role role);
    
    public void updateRole(long id,Role role);
         
    public void deleteRole(long id);
    
    public Role findRoleById(long id);
    
    public List<Role> listRoles();
    
    public void addUser(long id, User user);

    public void deleteUserById(long id, long userId);
    
}
