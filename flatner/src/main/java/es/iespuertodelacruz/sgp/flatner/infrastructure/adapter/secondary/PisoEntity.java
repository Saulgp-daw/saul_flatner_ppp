package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
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

	private boolean ascensor;

	private String descripcion;

	private String electrodomesticos;

	@Column(name="estancia_minima_dias")
	private int estanciaMinimaDias;

	private String fotos;

	private boolean fumar;

	@Column(name="gas_incluido")
	private boolean gasIncluido;

	private boolean jardin;

	@Column(name="luz_incluida")
	private boolean luzIncluida;

	@Column(name="m_cuadrados")
	private int mCuadrados;

	@Column(name="maps_link")
	private String mapsLink;

	private boolean mascotas;

	@Column(name="num_habitaciones")
	private int numHabitaciones;

	private boolean parejas;

	@Column(name="precio_mes")
	private BigDecimal precioMes;

	@Column(name="propietario_reside")
	private boolean propietarioReside;

	private boolean terraza;

	private String titulo;

	private String ubicacion;

	private BigDecimal valoracion;

	private boolean wifi;

	//bi-directional many-to-one association to UsuarioEntity
	@ManyToOne
	@JoinColumn(name="email_propietario")
	private UsuarioEntity propietario;

	//bi-directional many-to-many association to UsuarioEntity
//	@ManyToMany
//	@JoinColumn(name="id_piso")
//	private List<UsuarioEntity> usuarios_interesados;
	@JsonIgnore
	@ManyToMany(mappedBy = "pisosInteres")
	private List<UsuarioEntity> usuariosInteresados;

	//bi-directional many-to-one association to UsuarioEntity
	@OneToMany(mappedBy="pisoActual")
	private List<UsuarioEntity> inquilinos;

	public PisoEntity() {
	}

	public int getIdPiso() {
		return this.idPiso;
	}

	public void setIdPiso(int idPiso) {
		this.idPiso = idPiso;
	}

	public boolean getAscensor() {
		return this.ascensor;
	}

	public void setAscensor(boolean ascensor) {
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

	public boolean getFumar() {
		return this.fumar;
	}

	public void setFumar(boolean fumar) {
		this.fumar = fumar;
	}

	public boolean getGasIncluido() {
		return this.gasIncluido;
	}

	public void setGasIncluido(boolean gasIncluido) {
		this.gasIncluido = gasIncluido;
	}

	public boolean getJardin() {
		return this.jardin;
	}

	public void setJardin(boolean jardin) {
		this.jardin = jardin;
	}

	public boolean getLuzIncluida() {
		return this.luzIncluida;
	}

	public void setLuzIncluida(boolean luzIncluida) {
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

	public boolean getMascotas() {
		return this.mascotas;
	}

	public void setMascotas(boolean mascotas) {
		this.mascotas = mascotas;
	}

	public int getNumHabitaciones() {
		return this.numHabitaciones;
	}

	public void setNumHabitaciones(int numHabitaciones) {
		this.numHabitaciones = numHabitaciones;
	}

	public boolean getParejas() {
		return this.parejas;
	}

	public void setParejas(boolean parejas) {
		this.parejas = parejas;
	}

	public BigDecimal getPrecioMes() {
		return this.precioMes;
	}

	public void setPrecioMes(BigDecimal precioMes) {
		this.precioMes = precioMes;
	}

	public boolean getPropietarioReside() {
		return this.propietarioReside;
	}

	public void setPropietarioReside(boolean propietarioReside) {
		this.propietarioReside = propietarioReside;
	}

	public boolean getTerraza() {
		return this.terraza;
	}

	public void setTerraza(boolean terraza) {
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

	public boolean getWifi() {
		return this.wifi;
	}

	public void setWifi(boolean wifi) {
		this.wifi = wifi;
	}

	public UsuarioEntity getPropietario() {
		return this.propietario;
	}

	public void setPropietario(UsuarioEntity propietario) {
		this.propietario = propietario;
	}

	public List<UsuarioEntity> getUsuarios_interesados() {
		return this.usuariosInteresados;
	}

	public void setUsuarios_interesados(List<UsuarioEntity> usuarios_interesados) {
		this.usuariosInteresados = usuarios_interesados;
	}

	public List<UsuarioEntity> getInquilinos() {
		return this.inquilinos;
	}

	public void setInquilinos(List<UsuarioEntity> inquilinos) {
		this.inquilinos = inquilinos;
	}

	public UsuarioEntity addInquilino(UsuarioEntity inquilino) {
		getInquilinos().add(inquilino);
		inquilino.setPisoActual(this);

		return inquilino;
	}

	public UsuarioEntity removeInquilino(UsuarioEntity inquilino) {
		getInquilinos().remove(inquilino);
		inquilino.setPisoActual(null);

		return inquilino;
	}

}