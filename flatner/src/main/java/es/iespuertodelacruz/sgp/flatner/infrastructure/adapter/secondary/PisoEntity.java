package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary;

import java.io.Serializable;
import java.math.BigDecimal;
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
 * The persistent class for the pisos database table.
 * 
 */
@Entity
@Table(name="pisos")
@NamedQuery(name="PisoEntity.findAll", query="SELECT p FROM PisoEntity p")
public class PisoEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_piso")
	private int idPiso;

	private byte ascensor;

	private String descripcion;

	private String electrodomesticos;

	@Column(name="estancia_minima_dias")
	private int estanciaMinimaDias;

	private String fotos;

	private byte fumar;

	@Column(name="gas_incluido")
	private byte gasIncluido;

	private byte jardin;

	@Column(name="luz_incluida")
	private byte luzIncluida;

	@Column(name="m_cuadrados")
	private int mCuadrados;

	@Column(name="maps_link")
	private String mapsLink;

	private byte mascotas;

	@Column(name="num_habitaciones")
	private int numHabitaciones;

	@Column(name="num_votos")
	private int numVotos;

	private byte parejas;

	@Column(name="precio_mes")
	private BigDecimal precioMes;

	@Column(name="propietario_reside")
	private byte propietarioReside;

	private byte terraza;

	private String titulo;

	private String ubicacion;

	private BigDecimal valoracion;

	private byte verified;

	private byte wifi;

	//bi-directional many-to-one association to UsuarioEntity
	@ManyToOne
	@JoinColumn(name="email_propietario")
	private UsuarioEntity usuario;

	//bi-directional many-to-one association to UsuarioEntity
	@OneToMany(mappedBy="piso")
	private List<UsuarioEntity> usuarios;

	//bi-directional many-to-one association to WatchlistEntity
	@OneToMany(mappedBy="piso")
	private List<WatchlistEntity> watchlists;

	public PisoEntity() {
	}

	public int getIdPiso() {
		return this.idPiso;
	}

	public void setIdPiso(int idPiso) {
		this.idPiso = idPiso;
	}

	public byte getAscensor() {
		return this.ascensor;
	}

	public void setAscensor(byte ascensor) {
		this.ascensor = ascensor;
	}

	public String getDescripcion() {
		return this.descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getElectrodomesticos() {
		return this.electrodomesticos;
	}

	public void setElectrodomesticos(String electrodomesticos) {
		this.electrodomesticos = electrodomesticos;
	}

	public int getEstanciaMinimaDias() {
		return this.estanciaMinimaDias;
	}

	public void setEstanciaMinimaDias(int estanciaMinimaDias) {
		this.estanciaMinimaDias = estanciaMinimaDias;
	}

	public String getFotos() {
		return this.fotos;
	}

	public void setFotos(String fotos) {
		this.fotos = fotos;
	}

	public byte getFumar() {
		return this.fumar;
	}

	public void setFumar(byte fumar) {
		this.fumar = fumar;
	}

	public byte getGasIncluido() {
		return this.gasIncluido;
	}

	public void setGasIncluido(byte gasIncluido) {
		this.gasIncluido = gasIncluido;
	}

	public byte getJardin() {
		return this.jardin;
	}

	public void setJardin(byte jardin) {
		this.jardin = jardin;
	}

	public byte getLuzIncluida() {
		return this.luzIncluida;
	}

	public void setLuzIncluida(byte luzIncluida) {
		this.luzIncluida = luzIncluida;
	}

	public int getMCuadrados() {
		return this.mCuadrados;
	}

	public void setMCuadrados(int mCuadrados) {
		this.mCuadrados = mCuadrados;
	}

	public String getMapsLink() {
		return this.mapsLink;
	}

	public void setMapsLink(String mapsLink) {
		this.mapsLink = mapsLink;
	}

	public byte getMascotas() {
		return this.mascotas;
	}

	public void setMascotas(byte mascotas) {
		this.mascotas = mascotas;
	}

	public int getNumHabitaciones() {
		return this.numHabitaciones;
	}

	public void setNumHabitaciones(int numHabitaciones) {
		this.numHabitaciones = numHabitaciones;
	}

	public int getNumVotos() {
		return this.numVotos;
	}

	public void setNumVotos(int numVotos) {
		this.numVotos = numVotos;
	}

	public byte getParejas() {
		return this.parejas;
	}

	public void setParejas(byte parejas) {
		this.parejas = parejas;
	}

	public BigDecimal getPrecioMes() {
		return this.precioMes;
	}

	public void setPrecioMes(BigDecimal precioMes) {
		this.precioMes = precioMes;
	}

	public byte getPropietarioReside() {
		return this.propietarioReside;
	}

	public void setPropietarioReside(byte propietarioReside) {
		this.propietarioReside = propietarioReside;
	}

	public byte getTerraza() {
		return this.terraza;
	}

	public void setTerraza(byte terraza) {
		this.terraza = terraza;
	}

	public String getTitulo() {
		return this.titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getUbicacion() {
		return this.ubicacion;
	}

	public void setUbicacion(String ubicacion) {
		this.ubicacion = ubicacion;
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

	public byte getWifi() {
		return this.wifi;
	}

	public void setWifi(byte wifi) {
		this.wifi = wifi;
	}

	public UsuarioEntity getUsuario() {
		return this.usuario;
	}

	public void setUsuario(UsuarioEntity usuario) {
		this.usuario = usuario;
	}

	public List<UsuarioEntity> getUsuarios() {
		return this.usuarios;
	}

	public void setUsuarios(List<UsuarioEntity> usuarios) {
		this.usuarios = usuarios;
	}

	public UsuarioEntity addUsuario(UsuarioEntity usuario) {
		getUsuarios().add(usuario);
		usuario.setPiso(this);

		return usuario;
	}

	public UsuarioEntity removeUsuario(UsuarioEntity usuario) {
		getUsuarios().remove(usuario);
		usuario.setPiso(null);

		return usuario;
	}

	public List<WatchlistEntity> getWatchlists() {
		return this.watchlists;
	}

	public void setWatchlists(List<WatchlistEntity> watchlists) {
		this.watchlists = watchlists;
	}

	public WatchlistEntity addWatchlist(WatchlistEntity watchlist) {
		getWatchlists().add(watchlist);
		watchlist.setPiso(this);

		return watchlist;
	}

	public WatchlistEntity removeWatchlist(WatchlistEntity watchlist) {
		getWatchlists().remove(watchlist);
		watchlist.setPiso(null);

		return watchlist;
	}

}