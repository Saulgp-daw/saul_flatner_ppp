package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary;

import java.util.ArrayList;
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

	@Transactional
	@Override
	public Piso update(Piso domain) {
		Optional<PisoEntity> opt = peRepository.findById(domain.getIdPiso());
		
		if(opt.isPresent()) {
			PisoEntity pe = opt.get();
			pe.setAscensor(domain.isAscensor());
			pe.setDescripcion(domain.getDescripcion());
			pe.setElectrodomesticos(domain.getElectrodomesticos());
			pe.setEstanciaMinimaDias(domain.getEstanciaMinimaDias());
			pe.setFotos(mapper.listAString(domain.getFotos()));
			pe.setFumar(domain.isFumar());
			pe.setGasIncluido(domain.isGasIncluido());
			pe.setJardin(domain.isJardin());
			pe.setLuzIncluida(domain.isLuzIncluida());
			pe.setMCuadrados(domain.getmCuadrados());
			pe.setMapsLink(domain.getMapsLink());
			pe.setMascotas(domain.isMascotas());
			pe.setNumHabitaciones(domain.getNumHabitaciones());
			pe.setParejas(domain.isParejas());
			pe.setPrecioMes(domain.getPrecioMes());
			pe.setPropietarioReside(domain.isPropietarioReside());
			pe.setTerraza(domain.isTerraza());
			pe.setTitulo(domain.getTitulo());
			pe.setUbicacion(domain.getUbicacion());
			pe.setNumVotos(domain.getNum_votos()+1);
			pe.setValoracion(domain.getValoracion());
			
			PisoEntity update = peRepository.save(pe);
			return mapper.toDomainPiso(update);
			
		}
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
				List<WatchlistEntity> watchlists = pisoEntity.getUsuariosInteresados();
				List<UsuarioEntity> inquilinos = pisoEntity.getInquilinos();

				if (watchlists != null) {
					for (WatchlistEntity watchlist : new ArrayList<>(watchlists)) {
						UsuarioEntity interesado = watchlist.getUsuario();
						interesado.getPisosInteres().remove(watchlist);
				        watchlists.remove(watchlist);
					}
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
