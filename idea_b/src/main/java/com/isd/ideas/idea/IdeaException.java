package com.isd.ideas.idea;

public class IdeaException extends RuntimeException {

    public IdeaException(String message) {
        super(message);
    }

    @Override
    public String toString() {
        return getMessage();
    }
    
}
