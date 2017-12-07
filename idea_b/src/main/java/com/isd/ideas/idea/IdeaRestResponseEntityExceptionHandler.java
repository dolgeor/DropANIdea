/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.isd.ideas.idea;

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
public class IdeaRestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
 
    
    @ExceptionHandler(value = { IdeaException.class})
    protected ResponseEntity<IdeaTypeException> handleIdeaException(IdeaException e) {
        System.out.println(e);
        return new ResponseEntity<>(new IdeaTypeException(e.toString()), HttpStatus.NOT_FOUND);
    }
    

   
    private static class IdeaTypeException {
        private String message;

        public IdeaTypeException(String message) {
            this.message = message;
        }

        public IdeaTypeException() {
        }

        

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
        
    }
}