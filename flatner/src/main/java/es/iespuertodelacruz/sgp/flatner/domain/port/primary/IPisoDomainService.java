package es.iespuertodelacruz.sgp.flatner.domain.port.primary;

import java.util.List;

import es.iespuertodelacruz.sgp.flatner.domain.model.Piso;

public interface IPisoDomainService {
	List<Piso> findAll();
	Piso findById(Integer id);
	Piso save(Piso entity);
	Piso update(Piso entity);
}
