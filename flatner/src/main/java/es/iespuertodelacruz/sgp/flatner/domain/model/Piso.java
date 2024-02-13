package es.iespuertodelacruz.sgp.flatner.domain.model;

import java.math.BigDecimal;
import java.util.List;

public class Piso {
	private int idPiso;
	private boolean ascensor;
	private String descripcion;
	private String electrodomesticos;
	private int estanciaMinimaDias;
	private List<String> fotos;
	private boolean fumar;
	private boolean gasIncluido;
	private boolean jardin;
	private boolean luzIncluida;
	private int mCuadrados;
	private boolean mascotas;
	private int numHabitaciones;
	private String mapsLink;
	private boolean parejas;
	private BigDecimal precioMes;
	private boolean propietarioReside;
	private boolean terraza;
	private String titulo;
	private String ubicacion;
	private BigDecimal valoracion;
	private boolean wifi;
	private Usuario propietario;
	private List<Usuario> usuariosInteresados;
	private List<Usuario> inquilinos;
	
	public Piso() {
		super();
	}

	public Piso(int idPiso, boolean ascensor, String descripcion, String electrodomesticos, int estanciaMinimaDias,
			List<String> fotos, boolean fumar, boolean gasIncluido, boolean jardin, boolean luzIncluida, int mCuadrados,
			boolean mascotas, int numHabitaciones, String mapsLink, boolean parejas, BigDecimal precioMes,
			boolean propietarioReside, boolean terraza, String titulo, String ubicacion, BigDecimal valoracion,
			boolean wifi, Usuario propietario) {
		super();
		this.idPiso = idPiso;
		this.ascensor = ascensor;
		this.descripcion = descripcion;
		this.electrodomesticos = electrodomesticos;
		this.estanciaMinimaDias = estanciaMinimaDias;
		this.fotos = fotos;
		this.fumar = fumar;
		this.gasIncluido = gasIncluido;
		this.jardin = jardin;
		this.luzIncluida = luzIncluida;
		this.mCuadrados = mCuadrados;
		this.mascotas = mascotas;
		this.numHabitaciones = numHabitaciones;
		this.mapsLink = mapsLink;
		this.parejas = parejas;
		this.precioMes = precioMes;
		this.propietarioReside = propietarioReside;
		this.terraza = terraza;
		this.titulo = titulo;
		this.ubicacion = ubicacion;
		this.valoracion = valoracion;
		this.wifi = wifi;
		this.propietario = propietario;
	}

	public int getIdPiso() {
		return idPiso;
	}

	public void setIdPiso(int idPiso) {
		this.idPiso = idPiso;
	}

	public boolean isAscensor() {
		return ascensor;
	}

	public void setAscensor(boolean ascensor) {
		this.ascensor = ascensor;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getElectrodomesticos() {
		return electrodomesticos;
	}

	public void setElectrodomesticos(String electrodomesticos) {
		this.electrodomesticos = electrodomesticos;
	}

	public int getEstanciaMinimaDias() {
		return estanciaMinimaDias;
	}

	public void setEstanciaMinimaDias(int estanciaMinimaDias) {
		this.estanciaMinimaDias = estanciaMinimaDias;
	}

	public List<String> getFotos() {
		return fotos;
	}

	public void setFotos(List<String> fotos) {
		this.fotos = fotos;
	}

	public boolean isFumar() {
		return fumar;
	}

	public void setFumar(boolean fumar) {
		this.fumar = fumar;
	}

	public boolean isGasIncluido() {
		return gasIncluido;
	}

	public void setGasIncluido(boolean gasIncluido) {
		this.gasIncluido = gasIncluido;
	}

	public boolean isJardin() {
		return jardin;
	}

	public void setJardin(boolean jardin) {
		this.jardin = jardin;
	}

	public boolean isLuzIncluida() {
		return luzIncluida;
	}

	public void setLuzIncluida(boolean luzIncluida) {
		this.luzIncluida = luzIncluida;
	}

	public int getmCuadrados() {
		return mCuadrados;
	}

	public void setmCuadrados(int mCuadrados) {
		this.mCuadrados = mCuadrados;
	}

	public boolean isMascotas() {
		return mascotas;
	}

	public void setMascotas(boolean mascotas) {
		this.mascotas = mascotas;
	}

	public int getNumHabitaciones() {
		return numHabitaciones;
	}

	public void setNumHabitaciones(int numHabitaciones) {
		this.numHabitaciones = numHabitaciones;
	}

	public String getMapsLink() {
		return mapsLink;
	}

	public void setMapsLink(String mapsLink) {
		this.mapsLink = mapsLink;
	}

	public boolean isParejas() {
		return parejas;
	}

	public void setParejas(boolean parejas) {
		this.parejas = parejas;
	}

	public BigDecimal getPrecioMes() {
		return precioMes;
	}

	public void setPrecioMes(BigDecimal precioMes) {
		this.precioMes = precioMes;
	}

	public boolean isPropietarioReside() {
		return propietarioReside;
	}

	public void setPropietarioReside(boolean propietarioReside) {
		this.propietarioReside = propietarioReside;
	}

	public boolean isTerraza() {
		return terraza;
	}

	public void setTerraza(boolean terraza) {
		this.terraza = terraza;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getUbicacion() {
		return ubicacion;
	}

	public void setUbicacion(String ubicacion) {
		this.ubicacion = ubicacion;
	}

	public BigDecimal getValoracion() {
		return valoracion;
	}

	public void setValoracion(BigDecimal valoracion) {
		this.valoracion = valoracion;
	}

	public boolean isWifi() {
		return wifi;
	}

	public void setWifi(boolean wifi) {
		this.wifi = wifi;
	}

	public Usuario getPropietario() {
		return propietario;
	}

	public void setPropietario(Usuario propietario) {
		this.propietario = propietario;
	}

	public List<Usuario> getUsuariosInteresados() {
		return usuariosInteresados;
	}

	public void setUsuariosInteresados(List<Usuario> usuariosInteresados) {
		this.usuariosInteresados = usuariosInteresados;
	}

	public List<Usuario> getInquilinos() {
		return inquilinos;
	}

	public void setInquilinos(List<Usuario> inquilinos) {
		this.inquilinos = inquilinos;
	}
	
	
	
}
