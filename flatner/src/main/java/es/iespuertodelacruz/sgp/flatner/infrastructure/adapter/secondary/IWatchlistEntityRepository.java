package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IWatchlistEntityRepository extends JpaRepository<WatchlistEntity, Integer>{
	boolean existsByUsuarioEmailAndPisoIdPiso(String email, int idPiso);


}
