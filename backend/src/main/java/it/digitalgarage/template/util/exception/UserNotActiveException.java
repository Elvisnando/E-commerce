package it.digitalgarage.template.util.exception;

public class UserNotActiveException extends Exception {

    public UserNotActiveException() {
        super("User not activated");
    }
}
