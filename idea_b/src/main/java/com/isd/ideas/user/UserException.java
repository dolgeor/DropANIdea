package com.isd.ideas.user;

public class UserException extends RuntimeException {

    public UserException(String message) {
        super(message);
        System.out.println(message);
    }

    @Override
    public String toString() {
        return getMessage();
    }
    
}
