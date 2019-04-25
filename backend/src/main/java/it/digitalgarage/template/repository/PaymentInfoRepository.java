package it.digitalgarage.template.repository;

import it.digitalgarage.template.dto.PaymentInfoDto;
import it.digitalgarage.template.entity.PaymentInfo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentInfoRepository extends CrudRepository<PaymentInfo, Long> {
    List<PaymentInfo> findByUserId(Long id);
}
