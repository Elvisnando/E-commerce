package it.digitalgarage.template.util.exception;

public class UserNotFoundByTokenException extends Exception {

    public UserNotFoundByTokenException(){}

    public UserNotFoundByTokenException(String token) {

        super("Cannot find user with token " + token);
    }
}
