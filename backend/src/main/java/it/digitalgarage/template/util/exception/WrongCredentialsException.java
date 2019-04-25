package it.digitalgarage.template.util.exception;

public class WrongCredentialsException extends Exception {

    public WrongCredentialsException() {
        super("Email or Password error");
    }

}
