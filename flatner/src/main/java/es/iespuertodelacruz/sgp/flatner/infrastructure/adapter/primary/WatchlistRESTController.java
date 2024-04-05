package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.primary;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.iespuertodelacruz.sgp.flatner.domain.model.Piso;
import es.iespuertodelacruz.sgp.flatner.domain.model.Usuario;
import es.iespuertodelacruz.sgp.flatner.domain.model.Watchlist;
import es.iespuertodelacruz.sgp.flatner.domain.port.primary.IPisoDomainService;
import es.iespuertodelacruz.sgp.flatner.domain.port.primary.IUsuarioDomainService;
import es.iespuertodelacruz.sgp.flatner.domain.port.primary.IWatchlistDomainService;
import es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.primary.dto.AnotacionDTO;

@RestController
@CrossOrigin
@RequestMapping("/api/v2/watchlists")
public class WatchlistRESTController {

	@Autowired
	IUsuarioDomainService usuarioDomainService;

	@Autowired
	IPisoDomainService pisoDomainService;

	@Autowired
	IWatchlistDomainService watchlistDomainService;
	
	@GetMapping
	public ResponseEntity<?> findAll() {
		List<Watchlist> all = watchlistDomainService.findAll();
		return ResponseEntity.ok(all);
	}
	
	@GetMapping("/{email}")
	public ResponseEntity<?> findAllByEmail(@PathVariable String email) {
		List<Watchlist> allByUsuarioEmail = watchlistDomainService.findAllByUsuarioEmail(email);
		return ResponseEntity.ok(allByUsuarioEmail);
	}
	
	@PostMapping("/{email}/piso/{idPiso}")
	public ResponseEntity<?> agregarWatchlist(@PathVariable String email, @PathVariable Integer idPiso) {
		Usuario interesado = usuarioDomainService.findById(email);
		Piso piso = pisoDomainService.findById(idPiso);

		if (interesado == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuario no encontrado");
		}

		if (piso == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se puede asignar un piso que no existe");
		}

		boolean existsByUsuarioEmailAndPisoId = watchlistDomainService.existsByUsuarioEmailAndPisoId(email, idPiso);
		if (existsByUsuarioEmailAndPisoId) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No puedes poner la misma casa dos veces");
		}

		Watchlist save = watchlistDomainService.save(new Watchlist(0, piso, interesado, ""));
		return ResponseEntity.ok().body(save);
	}
	
	@DeleteMapping("/{email}/piso/{idPiso}")
	public ResponseEntity<?> borrarWatchlist(@PathVariable String email, @PathVariable Integer idPiso) {
		Usuario inquilino = usuarioDomainService.findById(email);
		Piso piso = pisoDomainService.findById(idPiso);

		if (inquilino != null && piso != null) {

			boolean borrado = watchlistDomainService.deleteByUsuarioEmailAndPisoId(email, idPiso);
			if (borrado) {
				return ResponseEntity.ok().body("Watchlist eliminada correctamente");
			} else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("No se pudo borrar la entrada de la watchlist.");
			}
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se puede asignar un piso o usario que no existe");
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> comentarioWatchlist(@PathVariable Integer id, @RequestBody AnotacionDTO dto ){
		Watchlist find = watchlistDomainService.findById(id);
		if(find != null) {
			find.setAnotaciones(dto.getAnotaciones());
			Watchlist update = watchlistDomainService.update(find);
			if(update != null){
				return ResponseEntity.ok().body(update);
			}
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Hubo un error al crear la anotación");
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("No se encontró esa watchlist");
		
	}
}
