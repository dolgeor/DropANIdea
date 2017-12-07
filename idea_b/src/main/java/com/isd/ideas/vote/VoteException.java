package com.isd.ideas.vote;

public class VoteException extends RuntimeException {

    public VoteException(String message) {
        super(message);
    }

    @Override
    public String toString() {
        return getMessage();
    }
    
}
