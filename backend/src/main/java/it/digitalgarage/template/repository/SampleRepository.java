package it.digitalgarage.template.repository;

import it.digitalgarage.template.entity.Sample;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SampleRepository extends PagingAndSortingRepository<Sample, Long> {

	List<Sample> findAll();

}
