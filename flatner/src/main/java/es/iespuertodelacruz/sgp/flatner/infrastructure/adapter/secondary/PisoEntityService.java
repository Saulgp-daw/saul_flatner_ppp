package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespuertodelacruz.sgp.flatner.domain.model.Piso;
import es.iespuertodelacruz.sgp.flatner.domain.port.secondary.IPisoDomainRepository;
import jakarta.transaction.Transactional;

@Service
public class PisoEntityService implements IPisoDomainRepository {

	@Autowired
	IPisoEntityRepository peRepository;

	EntityMapper mapper = new EntityMapper();

	@Override
	public List<Piso> findAll() {
		List<PisoEntity> lista = peRepository.findAll();
		return lista.stream().map(pe -> mapper.toDomainPiso(pe)).collect(Collectors.toList());
	}

	@Override
	public Piso findById(Integer id) {
		Piso piso = null;
		if (id != null) {
			Optional<PisoEntity> opt = peRepository.findById(id);
			if (opt.isPresent()) {
				PisoEntity pisoEntity = opt.get();
				piso = mapper.toDomainPiso(pisoEntity);
			}
		}
		return piso;
	}

	@Override
	public Piso save(Piso domain) {
		if (domain != null) {
			PisoEntity pe = mapper.toEntityPiso(domain, true);
			PisoEntity save = peRepository.save(pe);
			if (save != null) {
				return mapper.toDomainPiso(save);
			}
		}
		return null;
	}

	@Override
	public Piso update(Piso domain) {
		// TODO Auto-generated method stub
		return null;
	}

	@Transactional
	@Override
	public boolean delete(Integer id) {
		boolean borrado = false;
		if (id != null) {
			Optional<PisoEntity> opt = peRepository.findById(id);
			if (opt.isPresent()) {
				PisoEntity pisoEntity = opt.get();
				List<UsuarioEntity> usuariosInteresados = pisoEntity.getUsuarios_interesados();
				List<UsuarioEntity> inquilinos = pisoEntity.getInquilinos();

				if (usuariosInteresados != null) {
					for (UsuarioEntity interesado : usuariosInteresados) {
						interesado.getPisosInteres().remove(pisoEntity);
					}
					usuariosInteresados.clear();
				}

				if (inquilinos != null) {
					for (UsuarioEntity inquilino : inquilinos) {
						inquilino.setPisoActual(null);
					}
					inquilinos.clear();
				}

				peRepository.delete(pisoEntity);
				Optional<PisoEntity> pisoBorrado = peRepository.findById(id);
				if (pisoBorrado.isEmpty()) {
					borrado = true;
				}
			}
		}
		return borrado;
	}

}
