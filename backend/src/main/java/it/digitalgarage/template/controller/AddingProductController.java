package it.digitalgarage.template.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import it.digitalgarage.template.dto.AddProductRequestDto;
import it.digitalgarage.template.dto.ProductDto;
import it.digitalgarage.template.service.InsertProductDBService;
import it.digitalgarage.template.util.GlobalExceptionHandler;
import it.digitalgarage.template.util.exception.ProductNotInsertedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.security.Principal;

@RestController
@RequestMapping(path="/product")
@Api(tags = "AddProductDB", description = "Adding products")
public class AddingProductController extends GlobalExceptionHandler {

    @Autowired
    private InsertProductDBService service;

    //adding product to database, required to be logged
    @RequestMapping(path="/add", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    public Long addingProductToDB (Principal token, @RequestBody ProductDto productDto) throws ProductNotInsertedException {
        System.out.println("Controller adding product to db ");
        System.out.println(productDto.getName());
        System.out.println(productDto.getAvailability());
        System.out.println(productDto.getDescription());
        System.out.println(productDto.getProductionDate());
        System.out.println(productDto.getRegion());
        System.out.println(productDto.getPrice());
        System.out.println(productDto.getCategory());
        System.out.println(productDto.getSellerId());
        return service.saveProductInDB(productDto);
    }

    @RequestMapping(path = "/upload", method = RequestMethod.POST)
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    public ResponseEntity handleFileUpload(@RequestParam("file") MultipartFile file, @RequestParam("name") String id) {
        try {
            String[] test = file.getOriginalFilename().split("[.]");

            String newFileName = "product_" + id + "." + test[1];
            System.out.printf("File name=%s, size=%s\n", file.getOriginalFilename(),file.getSize());
            //creating a new file in some local directory
            File fileToSave = new File("/Users/filippomariapirillo/gitProjects/ChristianTemplate/pentabit/images/" + newFileName);
            //copy file content from received file to new local file
            file.transferTo(fileToSave);
        } catch (IOException ioe) {
            //if something went bad, we need to inform client about it
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        //everything was OK, return HTTP OK status (200) to the client
        return ResponseEntity.ok().build();
    }
}
