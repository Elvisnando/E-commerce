package it.digitalgarage.template.repository;

import it.digitalgarage.template.entity.CartItems;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CartRepository extends CrudRepository<CartItems, Long> {
    List<CartItems> findAllByUserId(Long id);
    CartItems findByUserIdAndProductId(Long id, Long productID);
}
