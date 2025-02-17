package com.alten.test.service;

import com.alten.test.model.User;
import com.alten.test.shared.AuthResponse;
import com.alten.test.shared.ErrorResponse;

public interface AuthService {

	AuthResponse account(User user);

	AuthResponse token(User user) throws Exception;
}
