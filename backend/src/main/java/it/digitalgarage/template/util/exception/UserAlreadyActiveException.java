package it.digitalgarage.template.util.exception;

import java.net.UnknownServiceException;

public class UserAlreadyActiveException extends Exception {

    public UserAlreadyActiveException() {
        super("User is already registered!");
    }
}
