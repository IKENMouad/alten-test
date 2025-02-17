package com.alten.test.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InvalidRequestException extends RuntimeException {

	private String message;

	public InvalidRequestException() {
	}

	public InvalidRequestException(String msg) {
		super(msg);
		this.message = msg;
	}

}
