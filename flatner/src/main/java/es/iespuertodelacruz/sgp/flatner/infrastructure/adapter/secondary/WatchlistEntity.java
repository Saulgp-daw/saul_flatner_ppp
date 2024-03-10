package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;


/**
 * The persistent class for the watchlists database table.
 * 
 */
@Entity
@Table(name="watchlists")
@NamedQuery(name="WatchlistEntity.findAll", query="SELECT w FROM WatchlistEntity w")
public class WatchlistEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_watchlist")
	private int idWatchlist;

	private String anotaciones;

	//bi-directional many-to-one association to PisoEntity
	@ManyToOne
	@JoinColumn(name="id_piso")
	private PisoEntity piso;

	//bi-directional many-to-one association to UsuarioEntity
	@ManyToOne
	@JoinColumn(name="email_usuario")
	private UsuarioEntity usuario;

	public WatchlistEntity() {
	}

	public int getIdWatchlist() {
		return this.idWatchlist;
	}

	public void setIdWatchlist(int idWatchlist) {
		this.idWatchlist = idWatchlist;
	}

	public String getAnotaciones() {
		return this.anotaciones;
	}

	public void setAnotaciones(String anotaciones) {
		this.anotaciones = anotaciones;
	}

	public PisoEntity getPiso() {
		return this.piso;
	}

	public void setPiso(PisoEntity piso) {
		this.piso = piso;
	}

	public UsuarioEntity getUsuario() {
		return this.usuario;
	}

	public void setUsuario(UsuarioEntity usuario) {
		this.usuario = usuario;
	}

}