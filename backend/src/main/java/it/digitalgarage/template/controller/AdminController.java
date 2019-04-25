package it.digitalgarage.template.controller;


import io.swagger.annotations.ApiImplicitParam;
import it.digitalgarage.template.dto.*;
import it.digitalgarage.template.service.AdminService;
import it.digitalgarage.template.service.AuthenticationService;
import it.digitalgarage.template.util.GlobalExceptionHandler;
import it.digitalgarage.template.util.exception.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(path = "/admin")
public class AdminController extends GlobalExceptionHandler {

    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private AdminService adminService;

    //authenticating administrator
    @RequestMapping(path = "/authenticate", method = RequestMethod.POST)
    public LoginResponseDto verifyUser(@RequestBody UserDto userDto) throws WrongCredentialsException, UserNotActiveException {
        return authenticationService.verifying(userDto);
    }

    //removing user
    @RequestMapping(path = "/removeUser", method = RequestMethod.POST)
    public void removeUser (@RequestBody UserDto userDto) throws CannotRemoveAdminUserException, RemoveUserException, UserNotFoundException {
        System.out.println("chiamata remove user from admin");
        Long userId = userDto.getId();
        adminService.removeUser(userId);
    }

    //adding new product
    @RequestMapping(path = "/addNewProduct", method = RequestMethod.POST)
    public void addNewProduct(@RequestBody ProductDto productToAdd){
        System.out.println("Chiamata add product from admin");
        adminService.addNewProduct(productToAdd);
    }

    //removing product
    @RequestMapping(path = "/removeProduct", method = RequestMethod.POST)
    public void removeProduct(@RequestBody ProductDto productDto){
        System.out.println("Chiamata remove product from admin");
        Long productID = productDto.getId();
        adminService.removeProduct(productID);
    }

    //retrieving list of products from db
    @RequestMapping(path = "/listProducts", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<ProductDto> listProducts() {
        System.out.println("Chiamata list products");
        return adminService.listProducts();
    }

    //retrieving all users from db
    @RequestMapping(path = "/users", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<UserDto> listUsers() {
        System.out.println("Chiamata list of users");
        return adminService.listUsers();
    }

    //retrieving a single user by id
    @RequestMapping(path="/user", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    public RegistrationRequestBodyDto getUserInfo(@RequestParam String email){
        System.out.println("Chiamata effettuata per Info : " + email);
        return adminService.getUser(email);
    }

    @RequestMapping(path="/paymentInfo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    public List<PaymentInfoDto> getPaymentInfo (@RequestParam String email){
        System.out.println("Chiamata effettuata per Payment Info: " + email);
        return adminService.getPaymentInfo(email);
    }

    @RequestMapping(path="/shippingInfo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    public List<ShippingInfoDto> getShippingInfo (@RequestParam String email){
        System.out.println("Chiamata effettuata per Shipping Info: " + email);
        return adminService.getShippingInfo(email);
    }

    @RequestMapping(path="/modifyUser", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    public void getUserInfo(Principal token, @RequestBody UserInfoDto userInfoDto){
        System.out.println("Chiamata effettuata per modifica account buyer");
        Long id = Long.parseLong(token.getName());
        adminService.modifyUser(id, userInfoDto);
    }
}
