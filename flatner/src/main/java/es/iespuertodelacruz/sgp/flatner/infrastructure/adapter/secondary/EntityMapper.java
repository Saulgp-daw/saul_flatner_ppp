package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import es.iespuertodelacruz.sgp.flatner.domain.model.Piso;
import es.iespuertodelacruz.sgp.flatner.domain.model.Usuario;

@Component
public class EntityMapper {
	
	protected List<String> stringAList(String fotos) {
		return Arrays.asList(fotos.split(";;"));
	}

	protected String listAString(List<String> fotos) {
		return fotos.stream().collect(Collectors.joining(";;"));
	}

	
	protected Usuario toDomainSimpleUsuario(UsuarioEntity entity) {
		Usuario usuario = null;
		if(entity != null) {
			usuario = new Usuario(
					entity.getEmail(), 
					entity.getNombre(), 
					entity.getApellidos(),
					entity.getFotoPerfil(),
					entity.getPassword(), 
					entity.getHash(), 
					entity.getRol(), 
					entity.getSexo(), 
					entity.getActive(), 
					entity.getFechaUltimaEstancia(),
					entity.getFechaUltimoAlquiler(),
					entity.getAnhoNacimiento(), 
					entity.getValoracion(),
					entity.getNumVotos()
					);
		}
		return usuario;
	}
	
	

	protected Piso toDomainSimplePiso(PisoEntity entity) {
		Piso piso = null;
		if (entity != null) {
			piso = new Piso(
					entity.getIdPiso(), 
					entity.getAscensor(), 
					entity.getDescripcion(),
					entity.getElectrodomesticos(), 
					entity.getEstanciaMinimaDias(), 
					this.stringAList(entity.getFotos()),
					entity.getFumar(), 
					entity.getGasIncluido(), 
					entity.getJardin(), 
					entity.getLuzIncluida(),
					entity.getMCuadrados(), 
					entity.getMascotas(), 
					entity.getNumHabitaciones(), 
					entity.getMapsLink(),
					entity.getParejas(), 
					entity.getPrecioMes(), 
					entity.getPropietarioReside(), 
					entity.getTerraza(),
					entity.getTitulo(), 
					entity.getUbicacion(), 
					entity.getValoracion(), 
					entity.getNumVotos(),
					entity.getWifi());
		}
		return piso;
	}
	
	protected Piso toDomainPiso(PisoEntity entity) {
		Piso piso = null;
		if (entity != null) {
			
			Usuario propietario = this.toDomainSimpleUsuario(entity.getPropietario());
			
			List<Usuario> usuariosInteresados = entity.getUsuariosInteresados().stream()
					.map(WatchlistEntity::getUsuario)
					.map(this::toDomainSimpleUsuario)
					.collect(Collectors.toList());
			
			List<Usuario> inquilinos = entity.getInquilinos().stream()
					.map(this::toDomainSimpleUsuario)
					.collect(Collectors.toList());
			
			piso = new Piso(
					entity.getIdPiso(), 
					entity.getAscensor(), 
					entity.getDescripcion(),
					entity.getElectrodomesticos(), 
					entity.getEstanciaMinimaDias(), 
					this.stringAList(entity.getFotos()),
					entity.getFumar(), 
					entity.getGasIncluido(), 
					entity.getJardin(), 
					entity.getLuzIncluida(),
					entity.getMCuadrados(), 
					entity.getMascotas(), 
					entity.getNumHabitaciones(), 
					entity.getMapsLink(),
					entity.getParejas(), 
					entity.getPrecioMes(), 
					entity.getPropietarioReside(), 
					entity.getTerraza(),
					entity.getTitulo(), 
					entity.getUbicacion(), 
					entity.getValoracion(), 
					entity.getNumVotos(),
					entity.getWifi(),
					propietario,
					usuariosInteresados,
					inquilinos
					);
		}
		return piso;
	}
	
	public Usuario toDomainUsuario(UsuarioEntity entity) {
		Usuario usuario = null;
		if(entity != null) {

			
			//mapeo de la lista de propiedades del usuario para convertirlas de Entity a Piso
			List<Piso> propiedades = entity.getPropiedades().stream()
					.map(this::toDomainSimplePiso)
					.collect(Collectors.toList());
			
			List<Piso> pisosInteres = entity.getWatchlists().stream()
					.map(WatchlistEntity::getPiso)
					.map(this::toDomainSimplePiso) 
					.collect(Collectors.toList());
			
			Piso pisoActual = this.toDomainSimplePiso(entity.getPisoActual());
	        
			usuario = new Usuario(
					entity.getEmail(),
					entity.getNombre(),
					entity.getApellidos(),
					entity.getFotoPerfil(),
					entity.getPassword(),
					entity.getHash(),
					entity.getRol(),
					entity.getSexo(),
					entity.getActive(),
					entity.getFechaUltimaEstancia(),
					entity.getFechaUltimoAlquiler(),
					entity.getAnhoNacimiento(),
					entity.getValoracion(),
					entity.getNumVotos(),
					propiedades,
					pisosInteres,
					pisoActual
					);
		}
		return usuario;
	}
	
	public UsuarioEntity toEntityUsuario(Usuario domain, boolean recursion) {
		UsuarioEntity ue = null;
		if(domain != null) {
			ue = new UsuarioEntity();
			ue.setEmail(domain.getEmail());
			ue.setActive(domain.isActive());
			ue.setAnhoNacimiento(domain.getAnhoNacimiento());
			ue.setApellidos(domain.getApellidos());
			ue.setFechaUltimaEstancia(domain.getFechaUltimaEstancia());
			ue.setFechaUltimoAlquiler(domain.getFechaUltimoAlquiler());
			ue.setFotoPerfil(domain.getFotoPerfil());
			ue.setNombre(domain.getNombre());
			ue.setPassword(domain.getPassword());
			ue.setRol(domain.getRol());
			ue.setSexo(domain.getSexo());
			ue.setValoracion(domain.getValoracion());
			ue.setHash(domain.getHash());
			
			if(recursion) {
				PisoEntity pisoActual = this.toEntityPiso(domain.getPisoActual(), false);
				ue.setPisoActual(pisoActual);
				
				List<PisoEntity> propiedades = domain.getPropiedades().stream()
						.map(piso -> this.toEntityPiso(piso, false))
						.collect(Collectors.toList());
				ue.setPropiedades(propiedades);
				
				List<PisoEntity> pisosInteres = domain.getPisosInteres().stream()
						.map(piso -> this.toEntityPiso(piso, false))
						.collect(Collectors.toList());
				
				ue.setPisosInteres(pisosInteres);
			}
		
		}
		return ue;
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
				List<UsuarioEntity> usuariosInteresados = new ArrayList<UsuarioEntity>();
				List<UsuarioEntity> inquilinos = new ArrayList<UsuarioEntity>();
				
				UsuarioEntity propietario = this.toEntityUsuario(domain.getPropietario(), false);
				pe.setPropietario(propietario);

				if(domain.getUsuariosInteresados() != null) {
					usuariosInteresados = domain.getUsuariosInteresados().stream()
							.map(usuario ->  this.toEntityUsuario(usuario, false)).collect(Collectors.toList());
				}
				pe.setUsuarios_interesados(usuariosInteresados);
				
				if(domain.getInquilinos() != null) {
					inquilinos = domain.getInquilinos().stream()
							.map(usuario ->  this.toEntityUsuario(usuario, false)).collect(Collectors.toList());
				}
				pe.setInquilinos(inquilinos);

				

			}

		}
		return pe;
	}
}
