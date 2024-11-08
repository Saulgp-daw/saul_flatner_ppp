package es.iespuertodelacruz.sgp.flatner.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespuertodelacruz.sgp.flatner.domain.model.Usuario;
import es.iespuertodelacruz.sgp.flatner.domain.port.primary.IUsuarioDomainService;
import es.iespuertodelacruz.sgp.flatner.domain.port.secondary.IUsuarioDomainRepository;

@Service
public class UsuarioDomainService implements IUsuarioDomainService {

	@Autowired IUsuarioDomainRepository usuarioRepository;
	
	@Override
	public List<Usuario> findAll() {
		
		return usuarioRepository.findAll();
	}

	@Override
	public Usuario findById(String email) {
		
		return usuarioRepository.findById(email);
	}

	@Override
	public Usuario save(Usuario domain) {
		return usuarioRepository.save(domain);
	}

	@Override
	public Usuario update(Usuario domain) {
		return usuarioRepository.update(domain);
	}

	@Override
	public boolean delete(String email) {
		return usuarioRepository.delete(email);
	}

	

}
