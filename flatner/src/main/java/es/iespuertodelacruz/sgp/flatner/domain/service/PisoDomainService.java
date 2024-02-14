package es.iespuertodelacruz.sgp.flatner.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespuertodelacruz.sgp.flatner.domain.model.Piso;
import es.iespuertodelacruz.sgp.flatner.domain.port.primary.IPisoDomainService;
import es.iespuertodelacruz.sgp.flatner.domain.port.secondary.IPisoDomainRepository;

@Service
public class PisoDomainService implements IPisoDomainService {
	
	@Autowired IPisoDomainRepository pisoRepository;

	@Override
	public List<Piso> findAll() {
		return pisoRepository.findAll();
	}

	@Override
	public Piso findById(Integer id) {
		return pisoRepository.findById(id);
	}

	@Override
	public Piso save(Piso entity) {
		return pisoRepository.save(entity);
	}

	@Override
	public Piso update(Piso entity) {
		return pisoRepository.update(entity);
	}

}
