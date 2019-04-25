package it.digitalgarage.template.service;

import it.digitalgarage.template.dto.BuyerDto;
import it.digitalgarage.template.dto.ProductDto;
import it.digitalgarage.template.entity.Product;
import it.digitalgarage.template.repository.BuyerRepository;
import it.digitalgarage.template.repository.ProductRepository;
import it.digitalgarage.template.util.exception.ProductNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseBody;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class FilterService {

    @Autowired
    private BuyerRepository buyerRepository;
    @Autowired
    private ProductRepository productRepository;

    public List<BuyerDto> listOfProductsOwner(){
        return buyerRepository.findAll()
                .stream()
                .map(s -> BuyerDto.builder()
                        .birthday(s.getBirthday().toString()) // DA MODIFICARE !!!!!!!!!!!!!!!!!!! C'ERA GETNAME PRIMA
                        .build())
                .collect(Collectors.toList());
    }

    public @ResponseBody List<ProductDto> listOfProductsByFilter(Optional<String> name,
                                            Optional<String> origin,
                                            Optional<String> expiryDate,
                                            Optional<Boolean> availability,
                                            Optional<Long> minPrice,
                                            Optional<Long> maxPrice) {
            System.out.println("Service filter for products");
            return productRepository.findByNameContainsAndRegionContainsAndProductionDateBeforeAndAvailabilityGreaterThanEqualAndPriceBetween(
                    name.isPresent() ? name.get() : "",
                    origin.isPresent() ? origin.get() : "",
                    //productionDate.isPresent() ? LocalDate.parse(productionDate.get()) : LocalDate.of(10000, 1, 1),
                    expiryDate.isPresent() ? LocalDate.of(10000, 1, 1) : LocalDate.of(10000, 1, 1),
                    (availability.isPresent() && (availability.get())) ? BigInteger.valueOf(1) : BigInteger.valueOf(Long.MAX_VALUE),
                    minPrice.isPresent() ? BigDecimal.valueOf(minPrice.get()) : BigDecimal.ZERO,
                    maxPrice.isPresent() ? BigDecimal.valueOf(maxPrice.get()) : BigDecimal.valueOf(Long.MAX_VALUE)
            ).stream()
                    .map(p -> ProductDto.builder()
                            .id(p.getId())
                            .name(p.getName())
                            .region(p.getRegion())
                            .productionDate(p.getProductionDate().toString())
                            .description(p.getDescription())
                            .availability(p.getAvailability())
                            .price(p.getPrice())
                            .sellerId(p.getSellerId())
                            .category(p.getCategory())
                            .build()
                    ).collect(Collectors.toList());
    }


    public List<ProductDto> listProductByName (String name) {
        return productRepository.findByNameContains(name).stream()
                .map(p -> ProductDto.builder()
                        .id(p.getId())
                        .name(p.getName())
                        .productionDate(p.getProductionDate().toString())
                        .description(p.getDescription())
                        .region(p.getRegion())
                        .availability(p.getAvailability())
                        .price(p.getPrice())
                        .sellerId(p.getSellerId())
                        .category(p.getCategory())
                        .build()
                ).collect(Collectors.toList());
    }

    public BigInteger quantityForSpecificProduct(Long idProduct) throws ProductNotFoundException{
        if(productRepository.findById(idProduct) == null){
            throw new ProductNotFoundException();
        }
        return productRepository.findById(idProduct).getAvailability();
    }

    public ProductDto productDetailsByID(Long productID) throws ProductNotFoundException {
        if(productRepository.findById(productID) == null){
            throw new ProductNotFoundException();
        }
        Product productToSend = productRepository.findById(productID);
        return ProductDto.builder()
                .region(productToSend.getRegion())
                .name(productToSend.getName())
                .price(productToSend.getPrice())
                .productionDate(productToSend.getProductionDate().toString())
                .availability(productToSend.getAvailability())
                .build();
    }
}
    