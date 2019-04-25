package it.digitalgarage.template.controller;

import io.swagger.annotations.Api;
import it.digitalgarage.template.dto.ProductDto;
import it.digitalgarage.template.service.ProductFilterService;
import it.digitalgarage.template.util.GlobalExceptionHandler;
import it.digitalgarage.template.util.exception.ProductFilterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path="/")
@Api(tags = "FilterProduct", description = "Search Controller by Fileter")
public class ProductFileterController extends GlobalExceptionHandler {
    @Autowired
    private ProductFilterService productFilterService;

    @RequestMapping(path="/ProductsBylocation", method = RequestMethod.GET)
    public List<ProductDto> retrunProductFilrer(@RequestParam (value = "location",  required = false)String location,
                                                @RequestParam (value = "availability",  required = false)String availability,
                                                @RequestParam (value = "name",  required = false)String name


    ) throws ProductFilterException {

       /* if(availability == null && location != null ) {
            return productFilterService.producFilter(location);
        } else {
            return productFilterService.producAvAndLoc(location);
        }
*/
       if (location != null) {
           return productFilterService.producFilter(location);
       } else { if(availability != null) {
           return productFilterService.producAvAndLoc(location);
       } else  { if (name != null) {
           return  productFilterService.producName(name);
       } else return  null; } }

    }


}
