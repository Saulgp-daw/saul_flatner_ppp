package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IWatchlistEntityRepository extends JpaRepository<WatchlistEntity, Integer>{
	
	boolean existsByUsuarioEmailAndPisoIdPiso(String email, int idPiso);
	
	@Modifying
	@Query("DELETE FROM WatchlistEntity w WHERE w.usuario.email = :email AND w.piso.idPiso = :idPiso")
	void deleteByUsuarioEmailAndPisoId(@Param("email") String emailUsuario, @Param("idPiso") int idPiso);

	@Query("SELECT w FROM WatchlistEntity w WHERE w.usuario.email = :email")
	List<WatchlistEntity> findAllByUsuarioEmail(@Param("email") String usuario);

}
