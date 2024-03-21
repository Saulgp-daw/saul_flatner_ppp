package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.primary;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.iespuertodelacruz.sgp.flatner.domain.model.Piso;
import es.iespuertodelacruz.sgp.flatner.domain.model.Usuario;
import es.iespuertodelacruz.sgp.flatner.domain.model.Watchlist;
import es.iespuertodelacruz.sgp.flatner.domain.port.primary.IPisoDomainService;
import es.iespuertodelacruz.sgp.flatner.domain.port.primary.IUsuarioDomainService;
import es.iespuertodelacruz.sgp.flatner.domain.port.primary.IWatchlistDomainService;
import es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary.WatchlistEntity;

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
}
