package es.iespuertodelacruz.sgp.flatner.infrastructure.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary.EntityMapper;
import es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary.UsuarioEntity;
import es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary.UsuarioEntityService;
import es.iespuertodelacruz.sgp.flatner.infrastructure.security.UserDetailsLogin;

@Configuration
public class ApplicationConfig {
	
	EntityMapper mapper = new EntityMapper();
	
	@Autowired
	private UsuarioEntityService repository;

	@Bean
	public UserDetailsService userDetailsService() {
		return email -> {
			UsuarioEntity entity = mapper.toEntityUsuario(repository.findById(email), false);
			UserDetailsLogin user = new UserDetailsLogin();
			user.setUsername(entity.getNombre());
			user.setPassword(entity.getPassword());
			user.setRole(entity.getRol());
			return user;
		};
	}

	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(userDetailsService());
		authProvider.setPasswordEncoder(passwordEncoder());
		return authProvider;
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
