package es.iespuertodelacruz.sgp.flatner.domain.service;

import java.util.List;

import org.springframework.stereotype.Service;

import es.iespuertodelacruz.sgp.flatner.domain.model.Watchlist;
import es.iespuertodelacruz.sgp.flatner.domain.port.primary.IWatchlistDomainService;

@Service
public class WatchlistDomainService implements IWatchlistDomainService{

	@Override
	public List<Watchlist> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Watchlist findById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Watchlist save(Watchlist domain) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Watchlist update(Watchlist domain) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean delete(Integer id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean existsByUsuarioEmailAndPisoId(String emailUsuario, Integer pisoId) {
		// TODO Auto-generated method stub
		return false;
	}

}
