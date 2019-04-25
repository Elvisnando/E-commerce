package it.digitalgarage.template.util.exception;

public class WrongUserAnswerException extends Exception {

    public WrongUserAnswerException() {
        super("Given answer is not correct!");
    }
}
