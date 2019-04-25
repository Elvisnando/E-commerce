package it.digitalgarage.template.controller;

import it.digitalgarage.template.dto.RegistrationRequestBodyDto;
import it.digitalgarage.template.service.RegistrationService;
import it.digitalgarage.template.util.GlobalExceptionHandler;
import it.digitalgarage.template.util.exception.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.naming.NameNotFoundException;
import javax.validation.Valid;


@RestController
@RequestMapping(path="/registration")
public class RegistrationController extends GlobalExceptionHandler {

    @Autowired
    private RegistrationService service;

    @RequestMapping(path = "/confirm", method = RequestMethod.GET)
    public void confirmRegistration (@RequestParam String token) throws UserNotFoundByTokenException, UserAlreadyActiveException {
        service.confirmRegistration(token);
    }

    @RequestMapping(path="/addUser", method = RequestMethod.POST)
    public void addNewUser (@RequestBody @Valid RegistrationRequestBodyDto requestBody) throws FieldNotValidException, UserDtoNotAccordantException, MessagingException {
        System.out.println("chiamata add user");
        service.checkEveryFieldAndThenSave(requestBody);
    }

}
