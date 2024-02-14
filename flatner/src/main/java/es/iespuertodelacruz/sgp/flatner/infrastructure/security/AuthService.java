package es.iespuertodelacruz.sgp.flatner.infrastructure.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import es.iespuertodelacruz.sgp.flatner.domain.model.Usuario;
import es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.primary.dto.LoginDTO;
import es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.primary.dto.RegisterDTO;
import es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary.UsuarioEntity;
import es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary.UsuarioEntityService;

@Service
public class AuthService {
	@Autowired
	private UsuarioEntityService usuarioservice;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtService jwtService;

	public String register(RegisterDTO userdetails) {
		UsuarioEntity userentity = new UsuarioEntity();
		userentity.setNombre(userdetails.getNombre());
		userentity.setPassword(passwordEncoder.encode(userdetails.getPassword()));
		userentity.setRol("ROLE_USER");
		
		//userdetails.setRole(userentity.getRol());
		String generateToken = jwtService.generateToken(userdetails.getNombre(), userdetails.getPassword());
		userentity.setEmail(userdetails.getEmail());
		userentity.setHash(generateToken);
		UsuarioEntity save = usuarioservice.registro(userentity);
		return generateToken;
	}

	public String authenticate(LoginDTO request) {
		Usuario userentity = usuarioservice.findById(request.getEmail());
		UserDetailsLogin userlogin = null;
		if (userentity != null) {
			if (passwordEncoder.matches(request.getPassword(), userentity.getPassword())) {
				userlogin = new UserDetailsLogin();
				userlogin.setUsername(userentity.getNombre());
				userlogin.setPassword(userentity.getPassword());
				userlogin.setRole(userentity.getRol());
			}
		}
		String generateToken = null;
		if (userlogin != null) {
			generateToken = jwtService.generateToken(userentity.getNombre(), userentity.getRol());
		}
		return generateToken;
	}
	
	public Boolean passCoinciden(String nuevaPass, String passCodificada) {
		return passwordEncoder.matches(nuevaPass, passCodificada);
	}
	
	public String codificarPassword(String password) {
		return passwordEncoder.encode(password);
	}
	
	public String generateNewToken(String username, String password) {
		return jwtService.generateToken(username, password);
	}
	
	 
}
