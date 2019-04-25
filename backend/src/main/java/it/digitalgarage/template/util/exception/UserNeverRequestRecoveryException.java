package it.digitalgarage.template.util.exception;

public class UserNeverRequestRecoveryException extends  Exception {

    public UserNeverRequestRecoveryException() {
        super("User Never request password reset");
    }
}
