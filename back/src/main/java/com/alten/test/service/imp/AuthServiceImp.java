package com.alten.test.service.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.alten.test.config.JwtUtil;
import com.alten.test.model.User;
import com.alten.test.repository.UserRepository;
import com.alten.test.service.AuthService;

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
	public String account(User user) {
		try {
			String hashedPass = passwordEncoder.encode(user.getPassword());
			user.setPassword(hashedPass);

			userRepository.save(user);

			return "ACCOUNT_CREATED";
		} catch (Exception e) {
			return "ACCOUNT_NOT_CREATED";
		}
	}

	@Override
	public String token(User user) throws Exception {
		try {
			authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));

			final UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(user.getEmail());
			System.out.println(userDetails.getUsername());
			return jwtUtil.generateToken(userDetails);

		} catch (Exception e) {
			if (e instanceof BadCredentialsException) {
				throw new RuntimeException("Error: Bad Credentials " + e.getMessage());
			} else {
				throw new RuntimeException("Error: " + e.getMessage());
			}
		}
	}

}
