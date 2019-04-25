package it.digitalgarage.template.controller;


import antlr.Token;
import it.digitalgarage.template.dto.LoginDto;
import it.digitalgarage.template.dto.LoginResponseDto;
import it.digitalgarage.template.dto.TokenDto;
import it.digitalgarage.template.dto.UserDto;
import it.digitalgarage.template.service.AuthenticationService;
import it.digitalgarage.template.util.GlobalExceptionHandler;
import it.digitalgarage.template.util.exception.TokenErrorException;
import it.digitalgarage.template.util.exception.UserNotActiveException;
import it.digitalgarage.template.util.exception.WrongCredentialsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(path="/login")
public class AthenticationController extends GlobalExceptionHandler {

    @Autowired
    private AuthenticationService service;

    //authentication control to use when user want to login
    @RequestMapping(path="/authenticate", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public LoginResponseDto verifyUser (@RequestBody UserDto userDto) throws WrongCredentialsException, UserNotActiveException {
        System.out.println("Calling service.verifying");
        return service.verifying(userDto);
    }


}