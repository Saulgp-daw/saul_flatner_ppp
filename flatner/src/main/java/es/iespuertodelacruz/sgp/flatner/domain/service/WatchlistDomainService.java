package es.iespuertodelacruz.sgp.flatner.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespuertodelacruz.sgp.flatner.domain.model.Watchlist;
import es.iespuertodelacruz.sgp.flatner.domain.port.primary.IWatchlistDomainService;
import es.iespuertodelacruz.sgp.flatner.domain.port.secondary.IWatchlistDomainRepository;

@Service
public class WatchlistDomainService implements IWatchlistDomainService{

	@Autowired IWatchlistDomainRepository watchlistRepository;
	
	@Override
	public List<Watchlist> findAll() {
		
		return watchlistRepository.findAll();
	}

	@Override
	public Watchlist findById(Integer id) {
		// TODO Auto-generated method stub
		return watchlistRepository.findById(id);
	}

	@Override
	public Watchlist save(Watchlist domain) {
		// TODO Auto-generated method stub
		return watchlistRepository.save(domain);
	}

	@Override
	public Watchlist update(Watchlist domain) {
		// TODO Auto-generated method stub
		return watchlistRepository.update(domain);
	}

	@Override
	public boolean delete(Integer id) {
		// TODO Auto-generated method stub
		return watchlistRepository.delete(id);
	}

	@Override
	public boolean existsByUsuarioEmailAndPisoId(String emailUsuario, Integer pisoId) {
		// TODO Auto-generated method stub
		return watchlistRepository.existsByUsuarioEmailAndPisoId(emailUsuario, pisoId);
	}

	@Override
	public boolean deleteByUsuarioEmailAndPisoId(String email, Integer pisoId) {
		return watchlistRepository.deleteByUsuarioEmailAndPisoId(email, pisoId);
		
	}

}
