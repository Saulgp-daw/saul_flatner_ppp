package es.iespuertodelacruz.sgp.flatner.domain.port.secondary;

import java.util.List;

import es.iespuertodelacruz.sgp.flatner.domain.model.Piso;

public interface IPisoDomainRepository {
	List<Piso> findAll();
	Piso findById(Integer id);
	Piso save(Piso domain);
	Piso update(Piso domain);
	boolean delete(Integer id);
}
