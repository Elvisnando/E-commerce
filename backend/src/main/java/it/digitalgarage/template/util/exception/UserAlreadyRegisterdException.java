package it.digitalgarage.template.util.exception;

public class UserAlreadyRegisterdException extends Exception {

    public UserAlreadyRegisterdException () {
        super("User email has already been registered");
    }
}
