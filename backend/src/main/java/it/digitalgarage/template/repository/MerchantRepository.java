package it.digitalgarage.template.repository;

import it.digitalgarage.template.entity.Merchant;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MerchantRepository extends CrudRepository<Merchant, Long> {
    Merchant findById(Long id);
}

