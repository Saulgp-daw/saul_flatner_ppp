package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.primary;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.net.URLConnection;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.iespuertodelacruz.sgp.flatner.domain.model.Piso;
import es.iespuertodelacruz.sgp.flatner.domain.model.Usuario;
import es.iespuertodelacruz.sgp.flatner.domain.port.primary.IPisoDomainService;
import es.iespuertodelacruz.sgp.flatner.domain.port.primary.IUsuarioDomainService;
import es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.primary.dto.PisoDTO;
import es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.primary.dto.UsuarioDTO;
import es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary.FileStorageService;
import es.iespuertodelacruz.sgp.flatner.infrastructure.security.JwtService;

@RestController
@CrossOrigin
@RequestMapping("/api/v2/usuarios")
public class UsuarioRESTController {

	@Autowired
	IUsuarioDomainService usuarioDomainService;

	@Autowired
	IPisoDomainService pisoDomainService;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private FileStorageService storageService;

	private List<String> stringAList(String fotos) {
		return Arrays.asList(fotos.split(";;"));
	}
	
	@GetMapping("/profile")
	public ResponseEntity<?> profile(@RequestHeader("Authorization") String authorizationHeader){
		//System.out.println("----------------------------------"+authorizationHeader);
		String token = authorizationHeader.substring(7);
		String email = jwtService.extractUsername(token);
		//System.out.println("----------------------------------"+email);
		Usuario usuario = usuarioDomainService.findById(email);
		return ResponseEntity.ok(usuario);
	}

	@GetMapping
	public ResponseEntity<?> findAll() {
		List<Usuario> lista = usuarioDomainService.findAll();
		return ResponseEntity.ok(lista);
	}

	@GetMapping("/{email}")
	public ResponseEntity<?> findById(@PathVariable String email) {
		Usuario encontrado = usuarioDomainService.findById(email);
		if (encontrado != null) {
			return ResponseEntity.ok(encontrado);
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuario no encontrado");
	}

	@GetMapping("/{email}/pisos")
	public ResponseEntity<?> findPisos(@PathVariable String email) {
		Usuario propietario = usuarioDomainService.findById(email);

		if (propietario != null) {
			if (propietario.getPropiedades() != null) {
				List<Piso> pisos = new ArrayList<Piso>();

				for (Piso piso : propietario.getPropiedades()) {
					Piso nuevo = pisoDomainService.findById(piso.getIdPiso());
					if (nuevo != null) {
						pisos.add(nuevo);
					}
				}
				return ResponseEntity.ok(pisos);
			}

		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuario no encontrado");
	}

	@DeleteMapping("/{email}")
	public ResponseEntity<?> deleteById(@PathVariable String email) {
		Usuario encontrado = usuarioDomainService.findById(email);
		if (encontrado != null) {
			try {
				boolean delete = usuarioDomainService.delete(email);
				return delete ? ResponseEntity.ok().body("Usuario borrado con éxito")
						: ResponseEntity.status(HttpStatus.BAD_REQUEST)
								.body("Hubo un error a la hora de borrar el usuario");
			} catch (Exception ex) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("EL usuario tiene piso vinculados");
			}
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuario no encontrado");
	}

	@DeleteMapping("/{email}/reside")
	public ResponseEntity<?> quitarPisoActual(@PathVariable String email) {
		Usuario inquilino = usuarioDomainService.findById(email);
		if (inquilino != null) {
			inquilino.setPisoActual(null);
			inquilino.setFechaUltimaEstancia(convertirFechaActualABigInteger());
			Usuario update = usuarioDomainService.update(inquilino);
			if (update != null) {
				return ResponseEntity.ok().body(inquilino);
			}
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Hubo un problema al desvincular");
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuario no encontrado");
	}

	@PostMapping("/{email}/reside/{id}")
	public ResponseEntity<?> pisoActual(@PathVariable String email, @PathVariable Integer id) {
		Usuario inquilino = usuarioDomainService.findById(email);

		if (inquilino != null) {
			Piso encontrado = pisoDomainService.findById(id);
			if (encontrado != null) {
				inquilino.setPisoActual(encontrado);
				Usuario update = usuarioDomainService.update(inquilino);
				if (update != null) {
					return ResponseEntity.ok().body(inquilino);
				}
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al actualizar el usuario");
			}
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se puede asignar un piso que no existe");
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuario no encontrado");
	}
	
	@PostMapping("/{email}/watchlist/{id}")
	public ResponseEntity<?> agregarWatchlist(@PathVariable String email, @PathVariable Integer id) {
		Usuario inquilino = usuarioDomainService.findById(email);

		if (inquilino != null) {
			Piso encontrado = pisoDomainService.findById(id);
			if (encontrado != null) {
				inquilino.getPisosInteres().add(encontrado);
				Usuario update = usuarioDomainService.update(inquilino);
				if (update != null) {
					return ResponseEntity.ok().body(inquilino);
				}
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al actualizar el usuario");
			}
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se puede asignar un piso que no existe");
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuario no encontrado");
	}
	
	@DeleteMapping("/{email}/watchlist/{id}")
	public ResponseEntity<?> borrarWatchlist(@PathVariable String email, @PathVariable Integer id) {
		Usuario inquilino = usuarioDomainService.findById(email);
		Piso piso = pisoDomainService.findById(id);

		if (inquilino != null && piso != null) {
				inquilino.eliminarPisoPorId(piso.getIdPiso());
				Usuario update = usuarioDomainService.update(inquilino);
				if (update != null) {
					return ResponseEntity.ok().body(inquilino);
				}
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al actualizar el usuario");
			}
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se puede asignar un piso que no existe");

	}

	@PostMapping("/{email}/pisos")
	public ResponseEntity<?> save(@PathVariable String email, @RequestBody PisoDTO pisoDTO) {
		Usuario propietarioFind = usuarioDomainService.findById(email);

		if (propietarioFind != null) {
			Piso piso = new Piso(0, pisoDTO.isAscensor(), pisoDTO.getDescripcion(), pisoDTO.getElectrodomesticos(),
					pisoDTO.getEstanciaMinimaDias(), stringAList(pisoDTO.getFotos()), pisoDTO.isFumar(),
					pisoDTO.isGasIncluido(), pisoDTO.isJardin(), pisoDTO.isLuzIncluida(), pisoDTO.getmCuadrados(),
					pisoDTO.isMascotas(), pisoDTO.getNumHabitaciones(), pisoDTO.getMapsLink(), pisoDTO.isParejas(),
					pisoDTO.getPrecioMes(), pisoDTO.isPropietarioReside(), pisoDTO.isTerraza(), pisoDTO.getTitulo(),
					pisoDTO.getUbicacion(), pisoDTO.getValoracion(), pisoDTO.isWifi(), propietarioFind);
			Piso save = pisoDomainService.save(piso);
			if (save != null) {
				return ResponseEntity.ok(save);
			}
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al guardar");
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Propietario no encontrado");
	}

	@PutMapping("/{email}")
	public ResponseEntity<?> update(@PathVariable String email, @RequestBody UsuarioDTO usuarioDto) {
		Usuario encontrado = usuarioDomainService.findById(email);
		if (encontrado != null) {
			encontrado.setNombre(usuarioDto.getNombre());
			encontrado.setApellidos(usuarioDto.getApellidos());
			encontrado.setAnhoNacimiento(usuarioDto.getAnhoNacimiento());
			encontrado.setSexo(usuarioDto.getSexo());
			encontrado.setPassword(passwordEncoder.encode(usuarioDto.getPassword()));
			encontrado.setFechaUltimaEstancia(convertirFechaABigInteger(usuarioDto.getFechaUltimaEstancia()));
			encontrado.setFechaUltimoAlquiler(convertirFechaABigInteger(usuarioDto.getFechaUltimoAlquiler()));
			encontrado.setValoracion(BigDecimal.valueOf(2.5));
			String generateToken = jwtService.generateToken(usuarioDto.getNombre(), usuarioDto.getPassword());
			encontrado.setHash(generateToken);
			
			String codedPhoto = usuarioDto.getFotoBase64();
			byte[] photoBytes = Base64.getDecoder().decode(codedPhoto);
			
			
			String perfilAntiguo = encontrado.getFotoPerfil();
			String nombreNuevoFichero = storageService.savePerfil(email, perfilAntiguo,usuarioDto.getFotoPerfil(), photoBytes);
			encontrado.setFotoPerfil(nombreNuevoFichero);
			
			Usuario update = usuarioDomainService.update(encontrado);
			if (update != null) {
				return ResponseEntity.ok(update);
			}
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al actualizar");
	}
	
	@GetMapping("/{email}/imgPerfil/{filename}")
	public ResponseEntity<?> getFiles(@PathVariable String email, @PathVariable String filename) {
		Resource resource = storageService.getPerfil(email, filename);
		// Try to determine file's content type
		String contentType = null;
		try {
			contentType = URLConnection.guessContentTypeFromStream(resource.getInputStream());
		} catch (IOException ex) {
			System.out.println("Could not determine file type.");
		}
		// Fallback to the default content type if type could not be determined
		if (contentType == null) {
			contentType = "application/octet-stream";
		}
		String headerValue = "attachment; filename=\"" + resource.getFilename() + "\"";
		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.header(org.springframework.http.HttpHeaders.CONTENT_DISPOSITION, headerValue).body(resource);
	}

	private static BigInteger convertirFechaABigInteger(String fechaComoString) {

		if (fechaComoString != null) {
			LocalDate fecha = LocalDate.parse(fechaComoString, DateTimeFormatter.ISO_LOCAL_DATE);
			long timestampEnMilisegundos = fecha.atStartOfDay(ZoneId.systemDefault()).toInstant().getEpochSecond();
			return BigInteger.valueOf(timestampEnMilisegundos);
		}
		return null;
	}

	private static BigInteger convertirFechaActualABigInteger() {
		long segundos = Instant.now().getEpochSecond();
		return BigInteger.valueOf(segundos);
	}

}
