/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.isd.ideas.user;

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
public class UserRestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
 
    @ExceptionHandler(value = {UserException.class})
    protected ResponseEntity<UserTypeException> handleUserException(UserException e) {
        return new ResponseEntity<>(new UserTypeException(e.toString()), HttpStatus.NOT_FOUND);
    }
   
    private static class UserTypeException {
        private String message;

        public UserTypeException(String message) {
            this.message = message;
        }

        public UserTypeException() {
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
        
    }
}