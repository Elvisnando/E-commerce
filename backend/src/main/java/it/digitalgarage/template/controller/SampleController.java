package it.digitalgarage.template.controller;

import io.swagger.annotations.Api;
import it.digitalgarage.template.dto.SampleDto;
import it.digitalgarage.template.service.SampleService;
import it.digitalgarage.template.util.Address;
import it.digitalgarage.template.util.GlobalExceptionHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("sample")
@Api(tags = "Sample", description = "Sample Controller")
public class SampleController extends GlobalExceptionHandler {

	@Autowired
	private SampleService service;

	@RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<SampleDto> get() {
		System.out.println(Address.builder().address("Via cappuccini").cap("80065").city("Sant'Agnello").country("Italia").number("69").province("NA").build());
		return service.get();
	}

	@RequestMapping(value = "", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public void save() {
		service.save();
	}

}
