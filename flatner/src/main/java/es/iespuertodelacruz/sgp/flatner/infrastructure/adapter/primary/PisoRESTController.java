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
import es.iespuertodelacruz.sgp.flatner.domain.port.primary.IPisoDomainService;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/pisos")
public class PisoRESTController {
	@Autowired IPisoDomainService pisoDomainService;
	
	@GetMapping
	public ResponseEntity<?> findAll(){
		List<Piso> lista = pisoDomainService.findAll();
		return ResponseEntity.ok(lista);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@PathVariable Integer id) {
		Piso encontrado = pisoDomainService.findById(id);
		if(encontrado != null) {
			return ResponseEntity.ok(encontrado);
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Piso no encontrado");
	}
}
