package it.digitalgarage.template.controller;

import it.digitalgarage.template.dto.ForgetPasswordDto;
import it.digitalgarage.template.dto.ResetPasswordDto;
import it.digitalgarage.template.dto.UserDto;
import it.digitalgarage.template.service.ForgetPasswordService;
import it.digitalgarage.template.util.GlobalExceptionHandler;
import it.digitalgarage.template.util.exception.UserNeverRequestRecoveryException;
import it.digitalgarage.template.util.exception.UserNotFoundByEmailException;
import it.digitalgarage.template.util.exception.WrongUserAnswerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;

@RestController
@RequestMapping(path = "/forget")
public class ForgetPasswordController extends GlobalExceptionHandler {

    @Autowired
    private ForgetPasswordService service;

    @RequestMapping(path = "/password", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void passwordForgotten(@RequestBody ForgetPasswordDto forgetPasswordDto) throws MessagingException, UserNotFoundByEmailException, WrongUserAnswerException {
        service.sendingEmail(forgetPasswordDto);
    }

    @RequestMapping(path = "/reset", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void resetPassword(@RequestBody ResetPasswordDto resetPasswordDto) throws UserNotFoundByEmailException, UserNeverRequestRecoveryException {
        service.resetPassword(resetPasswordDto);
    }


}
