package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespuertodelacruz.sgp.flatner.domain.model.Usuario;
import es.iespuertodelacruz.sgp.flatner.domain.port.secondary.IUsuarioDomainRepository;

@Service
public class UsuarioEntityService implements IUsuarioDomainRepository{
	
	@Autowired
	IUsuarioEntityRepository ueRepository;
	
	EntityMapper mapper = new EntityMapper();

	@Override
	public List<Usuario> findAll() {
		List<UsuarioEntity> lista = ueRepository.findAll();
		
		return lista.stream().map(ue -> mapper.toDomainUsuario(ue)).collect(Collectors.toList());
	}

	@Override
	public Usuario findById(String email) {
		Usuario usuario = null;
		if(email != null) {
			Optional<UsuarioEntity> opt = ueRepository.findById(email);
			if(opt.isPresent()) {
				
				UsuarioEntity usuarioEntity = opt.get();
				usuario = mapper.toDomainUsuario(usuarioEntity);
			}
			
		}
		return usuario;
	}

	@Override
	public Usuario save(Usuario entity) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Usuario update(Usuario entity) {
		// TODO Auto-generated method stub
		return null;
	}



}
