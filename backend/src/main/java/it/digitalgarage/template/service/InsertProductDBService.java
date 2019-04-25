package it.digitalgarage.template.service;
import it.digitalgarage.template.dto.ProductDto;
import it.digitalgarage.template.entity.Product;
import it.digitalgarage.template.repository.ProductRepository;
import it.digitalgarage.template.util.exception.ProductNotInsertedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;

@Service
@Transactional
public class InsertProductDBService {

    @Autowired
    private ProductRepository repository;

    //to add throw
    public Long saveProductInDB (ProductDto productDto) throws ProductNotInsertedException {
        System.out.println("service to send product to db");

        if(productDto == null){
            System.out.println("Error");
            throw new ProductNotInsertedException("PRODUCT NULL");
        }



        //to do = implement checks for products created
        Product productToSave = Product.builder()
                .availability(productDto.getAvailability())
                .description(productDto.getDescription())
                .productionDate(LocalDate.parse(productDto.getProductionDate()))
                .name(productDto.getName())
                .category(productDto.getCategory())
                .price(productDto.getPrice())
                .region(productDto.getRegion())
                .sellerId(productDto.getSellerId())
                .build();

        Product product = repository.save(productToSave);
        return product.getId();

//        try {
//            System.out.printf("File name=%s, size=%s\n", file.getOriginalFilename(),file.getSize());
//            //creating a new file in some local directory
//            File fileToSave = new File("C:\\test\\" + file.getOriginalFilename());
//            //copy file content from received file to new local file
//            file.transferTo(fileToSave);
//        } catch (IOException ioe) {
//            //if something went bad, we need to inform client about it
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
    }
}
