package it.digitalgarage.template.service;

import it.digitalgarage.template.dto.ProductDto;
import it.digitalgarage.template.entity.Product;
import it.digitalgarage.template.repository.ProductRepository;
import it.digitalgarage.template.util.exception.ProductNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@Transactional
public class SearchBarService {

    @Autowired
    private ProductRepository repository;

    public List<ProductDto> searchProducts (String product) throws ProductNotFoundException {

        List<Product> empty = repository.findTop5ByNameIsNotContaining(product);
        if(empty.isEmpty()){
            throw new ProductNotFoundException();
        }

        List<Product> productsFound = repository.findTop5ByNameContaining(product);
        return productsFound
                .stream()
                .map(s -> ProductDto.builder().name(s.getName()).build())
                .collect(Collectors.toList());
    }

}
