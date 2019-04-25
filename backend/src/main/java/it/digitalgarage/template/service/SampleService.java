package it.digitalgarage.template.service;

import it.digitalgarage.template.dto.SampleDto;
import it.digitalgarage.template.entity.Sample;
import it.digitalgarage.template.repository.SampleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class SampleService {

	@Autowired
	private SampleRepository repository;

	public List<SampleDto> get() {
		return repository.findAll()
				.stream()
				.map(s -> SampleDto.builder().sample(s.getSample()).build())
				.collect(Collectors.toList());
	}

	public void save() {
		Sample sample = Sample.builder().sample(LocalDateTime.now().toString()).build();
		repository.save(sample);
	}

}