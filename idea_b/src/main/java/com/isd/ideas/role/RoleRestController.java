package com.isd.ideas.role;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.isd.ideas.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(value = "/roles")
public class RoleRestController {

    @Autowired
    RoleService roleService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<Role>> listAllRoles() {
        return ResponseEntity.ok(roleService.listRoles());
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Role> getRole(@PathVariable("id") long id) {
        return ResponseEntity.ok(roleService.findRoleById(id));
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Void> createRole(@RequestBody Role role)//, UriComponentsBuilder ucBuilder)
    {
        roleService.createRole(role);
        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Role> updateRole(@PathVariable("id") long id, @RequestBody Role role) {
        roleService.updateRole(id, role);
        return ResponseEntity.ok(role);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Role> deleteRole(@PathVariable("id") long id) {
        roleService.deleteRole(id);
       return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    @RequestMapping(value = "/{id}/user", method = RequestMethod.POST)
    public ResponseEntity<Role> addUser(@PathVariable("id") long id , @RequestBody User user) {
        roleService.addUser(id, user);
       return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    @RequestMapping(value = "/{id_role}/users/{id_user}", method = RequestMethod.DELETE)
    public ResponseEntity<Role> deleteUser(@PathVariable("id_role") long id, @PathVariable("id_user") long idUser) {
        roleService.deleteUserById(id, idUser);
       return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
  
}
