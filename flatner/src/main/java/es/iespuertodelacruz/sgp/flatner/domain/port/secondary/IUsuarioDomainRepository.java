package es.iespuertodelacruz.sgp.flatner.domain.port.secondary;

import java.util.List;

import es.iespuertodelacruz.sgp.flatner.domain.model.Usuario;

public interface IUsuarioDomainRepository {
	List<Usuario> findAll();
	Usuario findById(String email);
	Usuario save(Usuario entity);
}
