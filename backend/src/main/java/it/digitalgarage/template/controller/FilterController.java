package it.digitalgarage.template.controller;

import it.digitalgarage.template.dto.BuyerDto;
import it.digitalgarage.template.dto.ImageEncodedDto;
import it.digitalgarage.template.dto.ProductDto;
import it.digitalgarage.template.service.FilterService;
import it.digitalgarage.template.util.exception.ProductNotFoundException;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigInteger;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/")
public class FilterController {

    @Autowired
    private FilterService filterService;


    @RequestMapping(path = "/searchProductsOwner", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<BuyerDto> listOfProductsOwner () {
        return filterService.listOfProductsOwner();
    }

    @RequestMapping(path = "/searchQuantityProduct", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody BigInteger quantityForProduct(@RequestParam Long idProduct) throws ProductNotFoundException {
        return filterService.quantityForSpecificProduct(idProduct);
    }

    @RequestMapping(
            path = "/searchProductsByFilter",
            method = RequestMethod.GET
    )
    public @ResponseBody List<ProductDto> listOfProductsByFilter (@RequestParam(value = "name", required = false) Optional<String> name,
                                                                  @RequestParam(value = "region", required = false) Optional<String> origin,
                                                                  @RequestParam(value = "productionDate", required = false) Optional<String> expiryDate,
                                                                  @RequestParam(value = "availability", required = false) Optional<Boolean> availability,
                                                                  @RequestParam(value = "minPrice", required = false) Optional<Long> minPrice,
                                                                  @RequestParam(value = "maxPrice", required = false) Optional<Long> maxPrice){
        System.out.println("Controller calling filters");
        System.out.println(name);
        System.out.println(filterService.listOfProductsByFilter(name, origin, expiryDate, availability, minPrice, maxPrice));
        return filterService.listOfProductsByFilter(name, origin, expiryDate, availability, minPrice, maxPrice);
    }

    @RequestMapping(path = "/searchProductByName", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<ProductDto> listProductsByName (@RequestParam String name) {
        System.out.println("chiamata search product by name");

        return filterService.listProductByName(name);
    }

    @RequestMapping(path = "/productDetails", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ProductDto productDetailsByID(@RequestParam Long productID) throws ProductNotFoundException {
         return filterService.productDetailsByID(productID);
    }

    @RequestMapping(path = "/getImage", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ImageEncodedDto getProductImage(@RequestParam String productID) throws IOException {
        String imgPath = "/Users/filippomariapirillo/gitProjects/ChristianTemplate/pentabit/images/product_" + productID + ".jpg";
        return ImageEncodedDto.builder().encodedImage(Base64.getEncoder().encodeToString(FileUtils.readFileToByteArray(new File(imgPath)))).build();
    }

}
