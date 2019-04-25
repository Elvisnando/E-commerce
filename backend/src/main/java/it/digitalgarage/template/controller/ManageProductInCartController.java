package it.digitalgarage.template.controller;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import it.digitalgarage.template.dto.*;
import it.digitalgarage.template.service.ManageProductInCartService;
import it.digitalgarage.template.util.GlobalExceptionHandler;
import it.digitalgarage.template.util.exception.ChartProductException;
import it.digitalgarage.template.util.exception.ProductNotFoundException;
import it.digitalgarage.template.util.exception.QuantityNotMoreAvailableException;
import it.digitalgarage.template.util.exception.UserNotFoundByTokenException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(path = "/Cart")
@Api(tags = "ManageCart", description = "Managing products for cart")
public class ManageProductInCartController extends GlobalExceptionHandler {

    @Autowired
    private ManageProductInCartService service;

    //to add throw
    //List<Product>
    @RequestMapping(path = "/add", method = RequestMethod.POST)
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    public  void addingProductToCart (Principal token, @RequestBody ProductToAddInCartDto productAssociatedUser) throws ChartProductException, UserNotFoundByTokenException, QuantityNotMoreAvailableException {
        System.out.println("adding product to db for cart");
        Long id = Long.parseLong(token.getName());
        service.addProductToCart(id, productAssociatedUser);
    }

    @RequestMapping(path = "/checkQuantity", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    public  @ResponseBody BigInteger checkQuantityInCartPerProduct (Principal token, @RequestBody ProductToAddInCartDto productAssociatedUser) throws ChartProductException, UserNotFoundByTokenException, ProductNotFoundException {
        System.out.println("checking quantity product to db for cart");
        Long id = Long.parseLong(token.getName());
        return service.checkQuantityInCartPerProduct(id, productAssociatedUser);
    }

    @RequestMapping(path = "/retrieve", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    public @ResponseBody List<CartItemsDto> retrievingCart (Principal token) throws ChartProductException {
        Long id = Long.parseLong(token.getName());
        return service.retrieveProductFromCart(id);
    }

    @RequestMapping(path = "/removeOneQuantityOneProduct", method = RequestMethod.POST)
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    public void removingOneQuantityOneProduct (Principal token, @RequestBody Long productID) throws ChartProductException {
        Long id = Long.parseLong(token.getName());
        service.removeOne(id, productID);
    }

    @RequestMapping(path = "/addingOneProduct", method = RequestMethod.POST)
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    public void addingOneProduct (Principal token, @RequestBody Long productID) throws ChartProductException {
        Long id = Long.parseLong(token.getName());
        service.addOne(id, productID);
    }

    @RequestMapping(path = "/removeOneProduct", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    public void removeOneProduct (Principal token, @RequestBody IdProductDto idProductDto) throws ChartProductException {
//        System.out.println("wou wou bellaaaa");
//        System.out.println(idProductDto.getProductID());
//        Long id = Long.parseLong(token.getName());
//        //Long productiD = Long.valueOf(productID);
//        System.out.println(Long.valueOf(idProductDto.getProductID()));
//        System.out.println("let s geri");
//        service.removeProduct(id, idProductDto.getProductID());
    }

    @RequestMapping(path = "/emptyCart", method = RequestMethod.GET)
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    public void emptyCart (Principal token) throws ChartProductException{
        Long id = Long.parseLong(token.getName());
        service.emptyCart(id);
    }

}
