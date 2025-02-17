package com.alten.test.exception;

import org.springframework.http.HttpStatus;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.alten.test.shared.ErrorResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(value = { RessourceNotFoundException.class })
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public @ResponseBody ErrorResponse handleRessourceNotFoundException(Exception ex) {
		return new ErrorResponse(HttpStatus.NOT_FOUND.value(), ex.getMessage());
	}

	@ExceptionHandler(value = { InvalidRequestException.class })
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public @ResponseBody ErrorResponse handleInvalidRequestException(Exception ex) {
		return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), ex.getMessage());
	}

	@ExceptionHandler(value = { AuthorizationDeniedException.class })
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public @ResponseBody ErrorResponse handleRessourceAccessException(Exception ex) {
		return new ErrorResponse(HttpStatus.UNAUTHORIZED.value(), ex.getMessage());
	}

	@ExceptionHandler
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public @ResponseBody ErrorResponse handleOtherExceptions(Exception ex) {
		return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
	}
}
