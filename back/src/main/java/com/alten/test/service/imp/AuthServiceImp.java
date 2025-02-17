package com.alten.test.service.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.alten.test.config.JwtUtil;
import com.alten.test.model.User;
import com.alten.test.model.UserDetailsImpl;
import com.alten.test.repository.UserRepository;
import com.alten.test.service.AuthService;
import com.alten.test.shared.AuthResponse;

@Service
public class AuthServiceImp implements AuthService {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;

	@Autowired
	private JwtUtil jwtUtil;

	@Override
	public AuthResponse account(User user) {
		try {

			if (userRepository.existsByEmail(user.getEmail()))
				throw new RuntimeException("Account already exist with the provided email");

			String hashedPass = passwordEncoder.encode(user.getPassword());
			user.setPassword(hashedPass);

			userRepository.save(user);

			AuthResponse response = new AuthResponse();
			response.setId(user.getId());
			response.setEmail(user.getEmail());
			response.setUsername(user.getUsername());

			return response;
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}

	@Override
	public AuthResponse token(User user) throws Exception {
		try {

			final UserDetailsImpl userDetails = (UserDetailsImpl) userDetailsServiceImpl
					.loadUserByUsername(user.getEmail());
			authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));

			String jwtToken = jwtUtil.generateToken(userDetails);

			AuthResponse response = new AuthResponse();
			response.setId(userDetails.getId());
			response.setEmail(userDetails.getUsername());
			response.setUsername(userDetails.getName());
			response.setToken(jwtToken);

			return response;
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}

}
