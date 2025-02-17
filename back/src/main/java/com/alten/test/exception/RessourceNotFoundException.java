package com.alten.test.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RessourceNotFoundException extends RuntimeException {

	private String message;

	public RessourceNotFoundException() {
	}

	public RessourceNotFoundException(String msg) {
		super(msg);
		this.message = msg;
	}

}
