package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.primary;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.iespuertodelacruz.sgp.flatner.domain.model.Usuario;
import es.iespuertodelacruz.sgp.flatner.domain.port.primary.IUsuarioDomainService;
import es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.primary.dto.RegisterDTO;
import es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary.UsuarioEntity;


@RestController
@CrossOrigin
@RequestMapping("/api/v1/usuarios")
public class UsuarioRESTController {
	
	@Autowired IUsuarioDomainService usuarioDomainService;
	
	@GetMapping
	public ResponseEntity<?> findAll() {
		List<Usuario> lista = usuarioDomainService.findAll();
		return ResponseEntity.ok(lista);
	}
	
	@GetMapping("/{email}")
	public ResponseEntity<?> findById(@PathVariable String email) {
		Usuario encontrado = usuarioDomainService.findById(email);
		if(encontrado != null) {
			return ResponseEntity.ok(encontrado);
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuario no encontrado");
	}
	
	
	
	
}
