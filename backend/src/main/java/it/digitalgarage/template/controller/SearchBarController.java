package it.digitalgarage.template.controller;


import io.swagger.annotations.Api;
import it.digitalgarage.template.dto.ProductDto;
import it.digitalgarage.template.entity.Product;
import it.digitalgarage.template.service.InsertProductDBService;
import it.digitalgarage.template.service.SearchBarService;
import it.digitalgarage.template.util.GlobalExceptionHandler;
import it.digitalgarage.template.util.exception.ProductNotFoundException;
import javassist.runtime.Desc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/")
@Api(tags = "Search", description = "Search Controller")
public class SearchBarController extends GlobalExceptionHandler {

    @Autowired
    private SearchBarService service;

    @RequestMapping(path="/search", method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE)
    public List<ProductDto> returningProducts (@RequestParam String product) throws ProductNotFoundException {
        System.out.println("Chiamata effettuata: " + product);
        return service.searchProducts(product);
    }

}