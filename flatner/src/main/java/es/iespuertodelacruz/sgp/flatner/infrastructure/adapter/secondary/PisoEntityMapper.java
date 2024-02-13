package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import es.iespuertodelacruz.sgp.flatner.domain.model.Piso;
import es.iespuertodelacruz.sgp.flatner.domain.model.Usuario;

//@Component
public class PisoEntityMapper {

	@Autowired
	private UsuarioEntityMapper usuarioMapper;


	private List<String> stringAList(String fotos) {
		return Arrays.asList(fotos.split(";;"));
	}

	private String listAString(List<String> fotos) {
		return fotos.stream().collect(Collectors.joining(";;"));
	}

	protected Piso toDomainSimple(PisoEntity entity) {
		Piso piso = null;
		if (entity != null) {
			piso = new Piso(entity.getIdPiso(), entity.getAscensor(), entity.getDescripcion(),
					entity.getElectrodomesticos(), entity.getEstanciaMinimaDias(), this.stringAList(entity.getFotos()),
					entity.getFumar(), entity.getGasIncluido(), entity.getJardin(), entity.getLuzIncluida(),
					entity.getMCuadrados(), entity.getMascotas(), entity.getNumHabitaciones(), entity.getMapsLink(),
					entity.getParejas(), entity.getPrecioMes(), entity.getPropietarioReside(), entity.getTerraza(),
					entity.getTitulo(), entity.getUbicacion(), entity.getValoracion(), entity.getWifi());
		}
		return piso;
	}

	protected PisoEntity toEntityPiso(Piso domain, boolean recursion) {
		PisoEntity pe = null;
		if (domain != null) {
			pe = new PisoEntity();
			pe.setIdPiso(domain.getIdPiso());
			pe.setAscensor(domain.isAscensor());
			pe.setDescripcion(domain.getDescripcion());
			pe.setElectrodomesticos(domain.getElectrodomesticos());
			pe.setEstanciaMinimaDias(domain.getEstanciaMinimaDias());
			String fotos = String.join(";;", domain.getFotos());
			pe.setFotos(fotos);
			pe.setFumar(domain.isFumar());
			pe.setGasIncluido(domain.isGasIncluido());
			pe.setJardin(domain.isJardin());
			pe.setLuzIncluida(domain.isLuzIncluida());
			pe.setMCuadrados(domain.getmCuadrados());
			pe.setMapsLink(domain.getMapsLink());
			pe.setMascotas(domain.isMascotas());
			pe.setNumHabitaciones(domain.getNumHabitaciones());
			pe.setParejas(domain.isParejas());
			pe.setPrecioMes(domain.getPrecioMes());
			pe.setPropietarioReside(domain.isPropietarioReside());
			pe.setTerraza(domain.isTerraza());
			pe.setTitulo(domain.getTitulo());
			pe.setUbicacion(domain.getUbicacion());
			pe.setValoracion(domain.getValoracion());
			pe.setWifi(domain.isWifi());

			if (recursion) {
				UsuarioEntity propietario = usuarioMapper.toEntity(domain.getPropietario(), false);
				pe.setPropietario(propietario);

				List<UsuarioEntity> usuariosInteresado = domain.getUsuariosInteresados().stream()
						.map(usuario -> usuarioMapper.toEntity(usuario, false)).collect(Collectors.toList());
				pe.setUsuarios_interesados(usuariosInteresado);

				List<UsuarioEntity> inquilinos = domain.getInquilinos().stream()
						.map(usuario -> usuarioMapper.toEntity(usuario, false)).collect(Collectors.toList());
				pe.setInquilinos(inquilinos);

			}

		}
		return pe;
	}
	
	

}
