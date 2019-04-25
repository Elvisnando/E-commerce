package it.digitalgarage.template.service;
import it.digitalgarage.template.dto.ProductDto;
import it.digitalgarage.template.entity.Product;
import it.digitalgarage.template.repository.ProductFilterRepository;
import it.digitalgarage.template.util.exception.ProductFilterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional


public class ProductFilterService {

    @Autowired
    private ProductFilterRepository service;

    public List<ProductDto> producFilter(String location) throws ProductFilterException {

        List<Product> productsfileter = service.findAllByRegion(location);

        return productsfileter
                        .stream()
                        .map(s -> ProductDto.builder()
                                .region(s.getRegion())
                                .name(s.getName())
                                .availability(s.getAvailability())
                                .description(s.getRegion())
                                .build())
                        .collect(Collectors.toList());

    }

    public List<ProductDto> producAvAndLoc( String location)  {

        List<Product> productsfileter = service.findAllByAvailabilityGreaterThan(0);

        return productsfileter
                .stream()
                .map(s -> ProductDto.builder()
                        .region(s.getRegion())
                        .name(s.getName())
                        .availability(s.getAvailability())
                        .description(s.getRegion())
                        .build())
                .collect(Collectors.toList());

    }

    public List<ProductDto> producName(String name) throws ProductFilterException {

        List<Product> productsfileter = service.findAllByName(name);

        return productsfileter
                .stream()
                .map(s -> ProductDto.builder()
                        .region(s.getRegion())
                        .name(s.getName())
                        .availability(s.getAvailability())
                        .description(s.getRegion())
                        .build())
                .collect(Collectors.toList());

    }




}
