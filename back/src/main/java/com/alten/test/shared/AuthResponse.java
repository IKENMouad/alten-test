package com.alten.test.shared;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {
	private String token;
	private String email;
	private String username;
	private Long id;

}
