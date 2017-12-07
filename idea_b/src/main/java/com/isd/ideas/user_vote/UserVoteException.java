package com.isd.ideas.user_vote;

public class UserVoteException extends RuntimeException {

    public UserVoteException(String message) {
        super(message);
    }

    @Override
    public String toString() {
        return getMessage();
    }
    
}
