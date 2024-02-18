package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.primary;

import java.util.Arrays;
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
import es.iespuertodelacruz.sgp.flatner.domain.port.primary.IPisoDomainService;
import es.iespuertodelacruz.sgp.flatner.domain.port.primary.IUsuarioDomainService;
import es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.primary.dto.PisoDTO;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/pisos")
public class PisoRESTController {
	@Autowired IPisoDomainService pisoDomainService;
	@Autowired IUsuarioDomainService usuarioDomainService;
	
	private List<String> stringAList(String fotos) {
		return Arrays.asList(fotos.split(";;"));
	}
	
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
	
	
	
	
	@PutMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody PisoDTO pisoDTO){
		Piso encontrado = pisoDomainService.findById(id);
		if(encontrado != null) {
				encontrado.setAscensor(pisoDTO.isAscensor());
				encontrado.setDescripcion(pisoDTO.getDescripcion());
				encontrado.setElectrodomesticos(pisoDTO.getElectrodomesticos());
				encontrado.setEstanciaMinimaDias(pisoDTO.getEstanciaMinimaDias());
				encontrado.setFotos(this.stringAList(pisoDTO.getFotos()));
				encontrado.setFumar(pisoDTO.isFumar());
				encontrado.setGasIncluido(pisoDTO.isGasIncluido());
				encontrado.setJardin(pisoDTO.isJardin());
				encontrado.setLuzIncluida(pisoDTO.isLuzIncluida());
				encontrado.setmCuadrados(pisoDTO.getmCuadrados());
				encontrado.setMapsLink(pisoDTO.getMapsLink());
				encontrado.setMascotas(pisoDTO.isMascotas());
				encontrado.setNumHabitaciones(pisoDTO.getNumHabitaciones());
				encontrado.setParejas(pisoDTO.isParejas());
				encontrado.setPrecioMes(pisoDTO.getPrecioMes());
				encontrado.setPropietarioReside(pisoDTO.isPropietarioReside());
				encontrado.setTerraza(pisoDTO.isTerraza());
				encontrado.setTitulo(pisoDTO.getTitulo());
				encontrado.setUbicacion(pisoDTO.getUbicacion());
				
				Piso update = pisoDomainService.update(encontrado);
				if(update != null) {
					return ResponseEntity.ok(update);
				}
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al actualizar");
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Piso no encontrado");
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteById(@PathVariable Integer id){
		Piso encontrado = pisoDomainService.findById(id);
		if(encontrado != null) {
			try {
				boolean delete = pisoDomainService.delete(id);
				return delete ? 
						ResponseEntity.ok().body("Piso borrado con éxito") : 
						ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Hubo un error a la hora de borrar el piso");
			}catch(Exception ex) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("EL piso tiene usuarios vinculados");
			}
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Piso no encontrado");
	}
	
	
}
