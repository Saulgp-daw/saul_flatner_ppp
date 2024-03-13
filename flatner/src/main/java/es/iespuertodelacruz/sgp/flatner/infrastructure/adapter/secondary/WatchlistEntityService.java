package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespuertodelacruz.sgp.flatner.domain.model.Watchlist;
import es.iespuertodelacruz.sgp.flatner.domain.port.secondary.IWatchlistDomainRepository;
import jakarta.transaction.Transactional;

@Service
public class WatchlistEntityService implements IWatchlistDomainRepository{
	
	@Autowired
	IWatchlistEntityRepository weRepository;
	
	@Autowired
	EntityMapper mapper;

	@Override
	public List<Watchlist> findAll() {
		List<WatchlistEntity> lista = weRepository.findAll();
		
		return lista.stream().map(we -> mapper.toDomainWatchlist(we)).collect(Collectors.toList());
	}

	@Override
	public Watchlist findById(Integer id) {
		Watchlist watchlist = null;
		if(id != null) {
			Optional<WatchlistEntity> opt = weRepository.findById(id);
			if(opt.isPresent()) {
				WatchlistEntity watchlistEntity = opt.get();
				watchlist = mapper.toDomainWatchlist(watchlistEntity);
			}
		}
		return watchlist;
	}

	@Override
	@Transactional
	public Watchlist save(Watchlist domain) {
		if(domain != null) {
			WatchlistEntity we = mapper.toEntityWatchlist(domain);
			WatchlistEntity save = weRepository.save(we);
			if(save != null) {
				return mapper.toDomainWatchlist(save);
			}
		}
		return null;
	}

	@Override
	@Transactional
	public Watchlist update(Watchlist domain) {
		Optional<WatchlistEntity> opt = weRepository.findById(domain.getId());
		if(opt.isPresent()) {
			WatchlistEntity we = opt.get();
			we.setAnotaciones(domain.getAnotaciones());
			WatchlistEntity update = weRepository.save(we);
			return mapper.toDomainWatchlist(update);
		}
		return null;
	}

	@Override
	@Transactional
	public boolean delete(Integer id) {
		boolean borrado = false;
		Optional<WatchlistEntity> opt = weRepository.findById(id);
		if(opt.isPresent()) {
			WatchlistEntity we = opt.get();
			weRepository.deleteById(id);
			return true;
		}
		return false;
	}

	@Override
	public boolean existsByUsuarioEmailAndPisoId(String emailUsuario, Integer pisoId) {
		boolean existente = weRepository.existsByUsuarioEmailAndPisoIdPiso(emailUsuario, pisoId);
		return existente;
	}

	@Override
	@Transactional
	public boolean deleteByUsuarioEmailAndPisoId(String email, Integer pisoId) {
		if (!weRepository.existsByUsuarioEmailAndPisoIdPiso(email, pisoId)) {
	        return false; 
	    }
		try {
			weRepository.deleteByUsuarioEmailAndPisoId(email, pisoId);
	        return true;
	    } catch (Exception e) {
	        System.out.println(e.getMessage());
	        return false;
	    }
	}

}
