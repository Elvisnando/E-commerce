package it.digitalgarage.template;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;

/**
 * Application bootstrap
 *
 * @since 2018-11-07
 * @author Cristian Laurini <cristian.laurini@gmail.com>
 */
@SpringBootApplication
@ComponentScan(value = "it.digitalgarage")
public class Application extends SpringBootServletInitializer {

	private static final Class<Application> applicationClass = Application.class;

	public static void main(String[] args) {
		SpringApplication.run(applicationClass, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(applicationClass);
	}

}
