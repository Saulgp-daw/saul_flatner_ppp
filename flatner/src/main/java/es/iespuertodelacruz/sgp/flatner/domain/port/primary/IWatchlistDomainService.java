package es.iespuertodelacruz.sgp.flatner.domain.port.primary;

import java.util.List;

import es.iespuertodelacruz.sgp.flatner.domain.model.Watchlist;
import es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary.WatchlistEntity;

public interface IWatchlistDomainService {
	List<Watchlist> findAll();
	Watchlist findById(Integer id);
	Watchlist save(Watchlist domain);
	Watchlist update(Watchlist domain);
	boolean delete(Integer id);
	boolean existsByUsuarioEmailAndPisoId(String emailUsuario, Integer pisoId);
	boolean deleteByUsuarioEmailAndPisoId(String emailUsuario, Integer pisoId);
	List<Watchlist> findAllByUsuarioEmail (String email);
}
