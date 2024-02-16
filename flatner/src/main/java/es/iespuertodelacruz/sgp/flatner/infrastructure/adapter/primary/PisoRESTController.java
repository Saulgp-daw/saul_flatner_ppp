package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.primary;

import java.util.Arrays;
import java.util.List;

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

import es.iespuertodelacruz.sgp.flatner.domain.model.Piso;
import es.iespuertodelacruz.sgp.flatner.domain.model.Usuario;
import es.iespuertodelacruz.sgp.flatner.domain.port.primary.IPisoDomainService;
import es.iespuertodelacruz.sgp.flatner.domain.port.primary.IUsuarioDomainService;
import es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.primary.dto.PisoDTO;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/pisos")
public class PisoRESTController {
	@Autowired IPisoDomainService pisoDomainService;
	@Autowired IUsuarioDomainService usuarioDomainService;
	
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
	
	@PostMapping("")
	public ResponseEntity<?> save(@RequestBody PisoDTO pisoDTO){
		Usuario propietarioFind = usuarioDomainService.findById(pisoDTO.getEmailPropietario());
		
		if(propietarioFind != null) {
			Piso piso = new Piso(0, pisoDTO.isAscensor(), pisoDTO.getDescripcion(), pisoDTO.getElectrodomesticos(), pisoDTO.getEstanciaMinimaDias(), stringAList( pisoDTO.getFotos()), pisoDTO.isFumar(), pisoDTO.isGasIncluido(), pisoDTO.isJardin(), pisoDTO.isLuzIncluida(), pisoDTO.getmCuadrados(), pisoDTO.isMascotas(), pisoDTO.getNumHabitaciones(), pisoDTO.getMapsLink(), pisoDTO.isParejas(), pisoDTO.getPrecioMes(), pisoDTO.isPropietarioReside(), pisoDTO.isTerraza(), pisoDTO.getTitulo(), pisoDTO.getUbicacion(), pisoDTO.getValoracion(), pisoDTO.isWifi(), propietarioFind);
			Piso save = pisoDomainService.save(piso);
			if(save != null) {
				return ResponseEntity.ok(save);
			}
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al guardar");
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Propietario no encontrado");
	}
	
	private List<String> stringAList(String fotos) {
		return Arrays.asList(fotos.split(";;"));
	}
}
