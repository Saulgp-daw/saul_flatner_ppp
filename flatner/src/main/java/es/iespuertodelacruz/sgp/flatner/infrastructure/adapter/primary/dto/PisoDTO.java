package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.primary.dto;

import java.math.BigDecimal;

import jakarta.persistence.Column;

public class PisoDTO {
	private boolean ascensor;
	private String descripcion;
	private String electrodomesticos;
	private int estanciaMinimaDias;
	private String fotos;
	private boolean fumar;
	private boolean gasIncluido;
	private boolean jardin;
	private boolean luzIncluida;
	private int mCuadrados;
	private String mapsLink;
	private boolean mascotas;
	private int numHabitaciones;
	private boolean parejas;
	private BigDecimal precioMes;
	private boolean propietarioReside;
	private boolean terraza;
	private String titulo;
	private String ubicacion;
	private BigDecimal valoracion;
	private boolean wifi;
	private String fotoBase64;
	
	public String getFotoBase64() {
		return fotoBase64;
	}


	public void setFotoBase64(String fotoBase64) {
		this.fotoBase64 = fotoBase64;
	}


	public PisoDTO() {
		super();
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

	public String getFotos() {
		return fotos;
	}

	public void setFotos(String fotos) {
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

	public String getMapsLink() {
		return mapsLink;
	}

	public void setMapsLink(String mapsLink) {
		this.mapsLink = mapsLink;
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
	
	
	
	
	
}
