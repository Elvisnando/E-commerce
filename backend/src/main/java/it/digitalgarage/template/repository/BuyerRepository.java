package it.digitalgarage.template.repository;

import it.digitalgarage.template.dto.BuyerDto;
import it.digitalgarage.template.entity.Buyer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BuyerRepository extends CrudRepository<Buyer, Long> {
    Buyer findById(Long id);
    List<Buyer> findAll();

}
