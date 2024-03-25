package es.iespuertodelacruz.sgp.flatner.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespuertodelacruz.sgp.flatner.domain.model.Watchlist;
import es.iespuertodelacruz.sgp.flatner.domain.port.primary.IWatchlistDomainService;
import es.iespuertodelacruz.sgp.flatner.domain.port.secondary.IWatchlistDomainRepository;
import es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary.WatchlistEntity;

@Service
public class WatchlistDomainService implements IWatchlistDomainService{

	@Autowired IWatchlistDomainRepository watchlistRepository;
	
	@Override
	public List<Watchlist> findAll() {
		
		return watchlistRepository.findAll();
	}

	@Override
	public Watchlist findById(Integer id) {
		return watchlistRepository.findById(id);
	}

	@Override
	public Watchlist save(Watchlist domain) {
		return watchlistRepository.save(domain);
	}

	@Override
	public Watchlist update(Watchlist domain) {
		return watchlistRepository.update(domain);
	}

	@Override
	public boolean delete(Integer id) {
		return watchlistRepository.delete(id);
	}

	@Override
	public boolean existsByUsuarioEmailAndPisoId(String emailUsuario, Integer pisoId) {
		return watchlistRepository.existsByUsuarioEmailAndPisoId(emailUsuario, pisoId);
	}

	@Override
	public boolean deleteByUsuarioEmailAndPisoId(String email, Integer pisoId) {
		return watchlistRepository.deleteByUsuarioEmailAndPisoId(email, pisoId);
		
	}

	@Override
	public List<Watchlist> findAllByUsuarioEmail(String email) {
		return watchlistRepository.findAllByUsuarioEmail(email);
	}

}
