package es.iespuertodelacruz.sgp.flatner.domain.port.primary;

import java.util.List;

import es.iespuertodelacruz.sgp.flatner.domain.model.Usuario;


public interface IUsuarioDomainService {
	List<Usuario> findAll();
	Usuario findById(String email);
	Usuario save(Usuario entity);
	Usuario update(Usuario entity);
}
