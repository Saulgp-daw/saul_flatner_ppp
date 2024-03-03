package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


/**
 * The persistent class for the usuarios database table.
 * 
 */
@Entity
@Table(name="usuarios")
@NamedQuery(name="UsuarioEntity.findAll", query="SELECT u FROM UsuarioEntity u")
public class UsuarioEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String email;

	private boolean active;

	@Column(name="anho_nacimiento")
	private int anhoNacimiento;

	private String apellidos;

	@Column(name="fecha_ultima_estancia")
	private BigInteger fechaUltimaEstancia;

	@Column(name="fecha_ultimo_alquiler")
	private BigInteger fechaUltimoAlquiler;

	@Column(name="foto_perfil")
	private String fotoPerfil;

	private String hash;

	private String nombre;

	@Column(name="num_votos")
	private int numVotos;

	private String password;

	private String rol;

	private String sexo;

	private BigDecimal valoracion;

	private boolean verified;

	//bi-directional many-to-one association to PisoEntity
	@OneToMany(mappedBy="propietario")
	private List<PisoEntity> propiedades;

	//bi-directional many-to-one association to PisoEntity
	@ManyToOne
	@JoinColumn(name="id_piso_actual")
	private PisoEntity pisoActual;

	//bi-directional many-to-one association to WatchlistEntity
	@OneToMany(mappedBy="usuario")
	private List<WatchlistEntity> pisosInteres;

	public UsuarioEntity() {
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean getActive() {
		return this.active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public int getAnhoNacimiento() {
		return this.anhoNacimiento;
	}

	public void setAnhoNacimiento(int anhoNacimiento) {
		this.anhoNacimiento = anhoNacimiento;
	}

	public String getApellidos() {
		return this.apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public BigInteger getFechaUltimaEstancia() {
		return this.fechaUltimaEstancia;
	}

	public void setFechaUltimaEstancia(BigInteger fechaUltimaEstancia) {
		this.fechaUltimaEstancia = fechaUltimaEstancia;
	}

	public BigInteger getFechaUltimoAlquiler() {
		return this.fechaUltimoAlquiler;
	}

	public void setFechaUltimoAlquiler(BigInteger fechaUltimoAlquiler) {
		this.fechaUltimoAlquiler = fechaUltimoAlquiler;
	}

	public String getFotoPerfil() {
		return this.fotoPerfil;
	}

	public void setFotoPerfil(String fotoPerfil) {
		this.fotoPerfil = fotoPerfil;
	}

	public String getHash() {
		return this.hash;
	}

	public void setHash(String hash) {
		this.hash = hash;
	}

	public String getNombre() {
		return this.nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public int getNumVotos() {
		return this.numVotos;
	}

	public void setNumVotos(int numVotos) {
		this.numVotos = numVotos;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRol() {
		return this.rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
	}

	public String getSexo() {
		return this.sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public BigDecimal getValoracion() {
		return this.valoracion;
	}

	public void setValoracion(BigDecimal valoracion) {
		this.valoracion = valoracion;
	}

	public boolean getVerified() {
		return this.verified;
	}

	public void setVerified(boolean verified) {
		this.verified = verified;
	}

	public List<PisoEntity> getPropiedades() {
		return this.propiedades;
	}

	public void setPropiedades(List<PisoEntity> pisos) {
		this.propiedades = pisos;
	}

	public PisoEntity addPiso(PisoEntity piso) {
		getPropiedades().add(piso);
		piso.setPropietario(this);

		return piso;
	}

	public PisoEntity removePiso(PisoEntity piso) {
		getPropiedades().remove(piso);
		piso.setPropietario(null);

		return piso;
	}

	public PisoEntity getPisoActual() {
		return this.pisoActual;
	}

	public void setPisoActual(PisoEntity piso) {
		this.pisoActual = piso;
	}

	public List<WatchlistEntity> getWatchlists() {
		return this.pisosInteres;
	}

	public void setWatchlists(List<WatchlistEntity> watchlists) {
		this.pisosInteres = watchlists;
	}

	public WatchlistEntity addWatchlist(WatchlistEntity watchlist) {
		getWatchlists().add(watchlist);
		watchlist.setUsuario(this);

		return watchlist;
	}

	public WatchlistEntity removeWatchlist(WatchlistEntity watchlist) {
		getWatchlists().remove(watchlist);
		watchlist.setUsuario(null);

		return watchlist;
	}

}