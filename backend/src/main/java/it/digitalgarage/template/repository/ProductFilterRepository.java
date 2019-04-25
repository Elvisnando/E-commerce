package it.digitalgarage.template.repository;

import it.digitalgarage.template.entity.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductFilterRepository extends CrudRepository<Product, UUID> {
List<Product> findAllByRegion(String origin);

List<Product> findAllByName(String name);

List<Product> findAllByAvailabilityGreaterThan(int availability);


List<Product> findAllByRegionAndAvailabilityGreaterThan(String origin, int availability); // origini e av



}
