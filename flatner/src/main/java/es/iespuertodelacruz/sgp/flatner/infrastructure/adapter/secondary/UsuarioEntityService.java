package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespuertodelacruz.sgp.flatner.domain.model.Usuario;
import es.iespuertodelacruz.sgp.flatner.domain.port.secondary.IUsuarioDomainRepository;

@Service
public class UsuarioEntityService implements IUsuarioDomainRepository{
	
	@Autowired
	IUsuarioEntityRepository ueRepository;

	@Override
	public List<Usuario> findAll() {
		
		return null;
	}

	@Override
	public Usuario findById(String email) {
		// TODO Auto-generated method stub
		return null;
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
