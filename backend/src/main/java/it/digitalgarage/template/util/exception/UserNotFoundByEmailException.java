package it.digitalgarage.template.util.exception;

public class UserNotFoundByEmailException extends Exception{

    public UserNotFoundByEmailException () {
        super("Email not found");
    }
}
