package it.digitalgarage.template.repository;

import it.digitalgarage.template.entity.ShippingInfo;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ShippingInfoRepository extends CrudRepository<ShippingInfo, Long> {

    List<ShippingInfo> findByUserId(Long id);
}
