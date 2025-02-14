package com.alten.test.service;

import com.alten.test.model.User;

public interface AuthService {

	String account(User user);

	String token(User user) throws Exception;
}
