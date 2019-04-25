package it.digitalgarage.template.repository;

import it.digitalgarage.template.entity.Producer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProducerRepository extends CrudRepository<Producer, Long> {
    Producer findById(Long id);
}