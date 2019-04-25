package it.digitalgarage.template.util;

import lombok.Getter;

@Getter
public class Response {

	private final Long code;
	private final String type;
	private final String message;

	public Response(Long code, String type, String message) {
		this.code = code;
		this.type = type;
		this.message = message;
	}
}