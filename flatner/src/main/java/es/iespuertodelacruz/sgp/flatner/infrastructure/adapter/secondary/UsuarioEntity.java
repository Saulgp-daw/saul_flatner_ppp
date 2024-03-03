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
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private String email;

	private byte active;

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

	private byte verified;

	//bi-directional many-to-one association to PisoEntity
	@OneToMany(mappedBy="usuario")
	private List<PisoEntity> pisos;

	//bi-directional many-to-one association to PisoEntity
	@ManyToOne
	@JoinColumn(name="id_piso_actual")
	private PisoEntity piso;

	//bi-directional many-to-one association to WatchlistEntity
	@OneToMany(mappedBy="usuario")
	private List<WatchlistEntity> watchlists;

	public UsuarioEntity() {
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public byte getActive() {
		return this.active;
	}

	public void setActive(byte active) {
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

	public byte getVerified() {
		return this.verified;
	}

	public void setVerified(byte verified) {
		this.verified = verified;
	}

	public List<PisoEntity> getPisos() {
		return this.pisos;
	}

	public void setPisos(List<PisoEntity> pisos) {
		this.pisos = pisos;
	}

	public PisoEntity addPiso(PisoEntity piso) {
		getPisos().add(piso);
		piso.setUsuario(this);

		return piso;
	}

	public PisoEntity removePiso(PisoEntity piso) {
		getPisos().remove(piso);
		piso.setUsuario(null);

		return piso;
	}

	public PisoEntity getPiso() {
		return this.piso;
	}

	public void setPiso(PisoEntity piso) {
		this.piso = piso;
	}

	public List<WatchlistEntity> getWatchlists() {
		return this.watchlists;
	}

	public void setWatchlists(List<WatchlistEntity> watchlists) {
		this.watchlists = watchlists;
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