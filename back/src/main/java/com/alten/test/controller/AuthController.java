package com.alten.test.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alten.test.model.User;
import com.alten.test.service.AuthService;
import com.alten.test.shared.AuthResponse;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

	@Autowired
	private AuthService authService;

	@PostMapping("/account")
	public AuthResponse account(@RequestBody User user) {
		return authService.account(user);
	}

	@PostMapping("/token")
	public AuthResponse token(@RequestBody User user) throws Exception {
		return authService.token(user);
	}

}
