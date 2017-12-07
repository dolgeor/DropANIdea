package com.isd.ideas.vote;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 *
 * @author Гриша
 */
@ControllerAdvice
public class VoteRestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
 
    
    @ExceptionHandler(value = { VoteException.class})
    protected ResponseEntity<UserVoteTypeException> handleUserVoteException(VoteException e) {
        System.out.println(e);
        return new ResponseEntity<>(new UserVoteTypeException(e.toString()), HttpStatus.NOT_FOUND);
    }
    

   
    private static class UserVoteTypeException {
        private String message;

        public UserVoteTypeException(String message) {
            this.message = message;
        }

        public UserVoteTypeException() {
        }

        

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
        
    }
}