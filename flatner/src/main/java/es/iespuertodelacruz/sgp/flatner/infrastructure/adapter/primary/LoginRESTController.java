package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.primary;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.iespuertodelacruz.sgp.flatner.domain.model.Usuario;
import es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.primary.dto.LoginDTO;
import es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.primary.dto.RegisterDTO;
import es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary.MailService;
import es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary.UsuarioEntityService;
import es.iespuertodelacruz.sgp.flatner.infrastructure.security.AuthService;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class LoginRESTController {
	Logger log;
	@Autowired
	private AuthService service;
	@Autowired
	private MailService mailService;
	@Autowired
	private UsuarioEntityService usuarioService;
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody RegisterDTO request) {
		String token = service.register(request);
		mailService.send(request.getEmail(), "Verficación de cuenta",
				"http://localhost:8080/api/registerverify?usermail=" + request.getEmail() + "&hash="
						+ token);
		return ResponseEntity.ok(token);
	}
	
	@GetMapping("/registerverify")
	public ResponseEntity<?> registerVerify(@RequestParam(name = "usermail") String usermail,
			@RequestParam(name = "hash") String hash) {
		Usuario encontrado = null;
		encontrado = usuarioService.findById(usermail);
		log = Logger.getLogger("debug");
		

		if (encontrado != null) {
			log.info(encontrado.getHash() );
			log.info(hash);
			if (hash.equals(encontrado.getHash())) {
				
				encontrado.setActive(true);
				Usuario guardado = usuarioService.save(encontrado);
				if (guardado != null) {
					return ResponseEntity.ok("Usuario verificado con éxito");
				}
			}

		}

		return ResponseEntity.badRequest().body("Usuario inexistente");
	}
	
	@PostMapping("/login")
	public ResponseEntity<String> authenticate(@RequestBody LoginDTO request) {
		Usuario login = usuarioService.findById(request.getEmail());
		System.out.println("-----------------"+login.isActive());
		if(!login.isActive()) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Verifícate mediante el correo antes de entrar");
		}
		String token = service.authenticate(request);
		if (token == null)
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User/pass erróneo");
		else
			return ResponseEntity.ok(token);
	}
}
