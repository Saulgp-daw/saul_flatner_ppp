package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary;

import java.util.ArrayList;
import java.util.List;

import es.iespuertodelacruz.sgp.flatner.domain.model.Piso;
import es.iespuertodelacruz.sgp.flatner.domain.model.Usuario;

public class UsuarioEntityMapper {
	
	private List<Piso> convertirAListaDePisos(List<PisoEntity> pisoEntities) {
	    if(pisoEntities == null) {
	        return null;
	    }
	    List<Piso> pisos = new ArrayList<>();
	    for(PisoEntity pisoEntity : pisoEntities) {
	        // Aquí necesitas convertir PisoEntity a Piso.
	        // Asumiendo que tienes un método o constructor para hacerlo.
	        Piso piso = tuMetodoDeConversionPiso(pisoEntity);
	        pisos.add(piso);
	    }
	    return pisos;
	}
	
	public Usuario toDomain(UsuarioEntity entity) {
		Usuario usuario = null;
		if(entity != null) {
			boolean isActive = entity.getActive() != 0;
			List<Piso> propiedades = convertirAListaDePisos(entity.getPropiedades());
	        List<Piso> pisosInteres = convertirAListaDePisos(entity.getPisosInteres());
	        
			usuario = new Usuario(
					entity.getEmail(), 
					entity.getNombre(), 
					entity.getApellidos(), 
					entity.getPassword(), 
					entity.getHash(), 
					entity.getRol(), 
					entity.getSexo(), 
					false, 
					entity.getAnhoNacimiento(), 
					entity.getValoracion(), 
					null, 
					null, 
					null
					);
		}
		return usuario;
	}
}
