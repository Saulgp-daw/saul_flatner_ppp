package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary;

import java.util.List;

import org.springframework.stereotype.Service;

import es.iespuertodelacruz.sgp.flatner.domain.model.Watchlist;
import es.iespuertodelacruz.sgp.flatner.domain.port.secondary.IWatchlistDomainRepository;

@Service
public class WatchlistEntityService implements IWatchlistDomainRepository{

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
