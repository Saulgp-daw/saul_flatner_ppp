package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.primary;

import java.math.BigInteger;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.iespuertodelacruz.sgp.flatner.domain.model.Piso;
import es.iespuertodelacruz.sgp.flatner.domain.model.Usuario;
import es.iespuertodelacruz.sgp.flatner.domain.port.primary.IPisoDomainService;
import es.iespuertodelacruz.sgp.flatner.domain.port.primary.IUsuarioDomainService;
import es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.primary.dto.UsuarioDTO;
import es.iespuertodelacruz.sgp.flatner.infrastructure.security.JwtService;


@RestController
@CrossOrigin
@RequestMapping("/api/v1/usuarios")
public class UsuarioRESTController {
	
	@Autowired IUsuarioDomainService usuarioDomainService;

	@Autowired IPisoDomainService pisoDomainService;
	
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtService jwtService;
	
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
	
	@PostMapping("/{email}/piso_actual/{id}")
	public ResponseEntity<?> pisoActual(@PathVariable String email, @PathVariable Integer id){
		Usuario inquilino = usuarioDomainService.findById(email);
		
		if(inquilino != null) {
			Piso encontrado = pisoDomainService.findById(id);
			if(encontrado != null) {
				inquilino.setPisoActual(encontrado);
			}
			
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuario no encontrado");
	}
	
	@PutMapping("")
	public ResponseEntity<?> update(@RequestBody UsuarioDTO usuarioDto){
		Usuario encontrado = usuarioDomainService.findById(usuarioDto.getEmail());
		if(encontrado != null) {
			encontrado.setNombre(usuarioDto.getNombre());
			encontrado.setApellidos(usuarioDto.getApellidos());
			encontrado.setAnhoNacimiento(usuarioDto.getAnhoNacimiento());
			encontrado.setSexo(usuarioDto.getSexo());
			encontrado.setFotoPerfil(usuarioDto.getFotoPerfil());
			encontrado.setPassword(passwordEncoder.encode(usuarioDto.getPassword()));
			BigInteger fechaUltimaEstancia = convertirFechaABigInteger(usuarioDto.getFechaUltimaEstancia());
			encontrado.setFechaUltimaEstancia(fechaUltimaEstancia);
			encontrado.setFechaUltimoAlquiler(convertirFechaABigInteger(usuarioDto.getFechaUltimoAlquiler()));


			String generateToken = jwtService.generateToken(usuarioDto.getNombre(), usuarioDto.getPassword());
			encontrado.setHash(generateToken);
			Usuario update = usuarioDomainService.update(encontrado);
			if(update != null) {
				return ResponseEntity.ok(update);
			}
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al actualizar");
	}
	
	
	private static BigInteger convertirFechaABigInteger(String fechaComoString) {
		
		if(fechaComoString != "") {
			LocalDate fecha = LocalDate.parse(fechaComoString, DateTimeFormatter.ISO_LOCAL_DATE);
	        long timestampEnMilisegundos = fecha.atStartOfDay(ZoneId.systemDefault()).toInstant().toEpochMilli();
	        return BigInteger.valueOf(timestampEnMilisegundos);
		}
        return null;
    }
	
}
