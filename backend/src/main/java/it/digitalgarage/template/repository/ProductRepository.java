package it.digitalgarage.template.repository;

import it.digitalgarage.template.dto.ProductDto;
import it.digitalgarage.template.entity.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends CrudRepository<Product, UUID> {
    List<Product> findAll();
    List<Product> findTop5ByNameStartsWith(String name);
    List<Product> findTop5ByNameContaining(String name);
    List<Product> findTop5ByNameIsNotContaining(String name);
    Product findById(Long id);
    List<Product> findAllById(Long id);
    List<Product> findByNameContains(String name);

    List<Product> findByNameContainsAndRegionContainsAndProductionDateBeforeAndAvailabilityGreaterThanEqualAndPriceBetween(
            String name,
            String origin,
            LocalDate expiryDate,
            BigInteger availability,
            BigDecimal minPrice,
            BigDecimal maxPrice
    );




}