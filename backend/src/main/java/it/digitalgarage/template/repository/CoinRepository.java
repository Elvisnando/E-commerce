package it.digitalgarage.template.repository;


import it.digitalgarage.template.entity.CoinAddresses;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoinRepository extends CrudRepository<CoinAddresses, Long> {
    CoinAddresses findByUserID(Long id_user);
    List<CoinAddresses> findAllByAvailableIsTrue();

    }
