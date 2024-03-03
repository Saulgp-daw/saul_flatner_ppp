package es.iespuertodelacruz.sgp.flatner.domain.model;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Iterator;
import java.util.List;

public class Usuario {
	private String email;
	private String nombre;
	private String apellidos;
	private String fotoPerfil;
	private String password;
	private String hash;
	private String rol;
	private String sexo;
	private boolean active;
	private BigInteger fechaUltimaEstancia;
	private BigInteger fechaUltimoAlquiler;
	private int anhoNacimiento;
	private BigDecimal valoracion;
	private int numVotos;
	private List<Piso> propiedades;
	private List<Piso> pisosInteres;
	private Piso pisoActual;
	
	public Usuario() {
		super();
	}

	public Usuario(String email, String nombre, String apellidos, String fotoPerfil, String password, String hash,
			String rol, String sexo, boolean active, BigInteger fechaUltimaEstancia, BigInteger fechaUltimoAlquiler,
			int anhoNacimiento, BigDecimal valoracion, int numVotos) {
		super();
		this.email = email;
		this.nombre = nombre;
		this.apellidos = apellidos;
		this.fotoPerfil = fotoPerfil;
		this.password = password;
		this.hash = hash;
		this.rol = rol;
		this.sexo = sexo;
		this.active = active;
		this.fechaUltimaEstancia = fechaUltimaEstancia;
		this.fechaUltimoAlquiler = fechaUltimoAlquiler;
		this.anhoNacimiento = anhoNacimiento;
		this.valoracion = valoracion;
		this.numVotos = numVotos;
	}
	
	public Usuario(String email, String nombre, String apellidos, String fotoPerfil, String password, String hash,
			String rol, String sexo, boolean active, BigInteger fechaUltimaEstancia, BigInteger fechaUltimoAlquiler,
			int anhoNacimiento, BigDecimal valoracion, int numVotos, List<Piso> propiedades, List<Piso> pisosInteres,
			Piso pisoActual) {
		super();
		this.email = email;
		this.nombre = nombre;
		this.apellidos = apellidos;
		this.fotoPerfil = fotoPerfil;
		this.password = password;
		this.hash = hash;
		this.rol = rol;
		this.sexo = sexo;
		this.active = active;
		this.fechaUltimaEstancia = fechaUltimaEstancia;
		this.fechaUltimoAlquiler = fechaUltimoAlquiler;
		this.anhoNacimiento = anhoNacimiento;
		this.valoracion = valoracion;
		this.numVotos = numVotos;
		this.propiedades = propiedades;
		this.pisosInteres = pisosInteres;
		this.pisoActual = pisoActual;
	}



	public int getNumVotos() {
		return numVotos;
	}

	public void setNumVotos(int numVotos) {
		this.numVotos = numVotos;
	}

	public String getFotoPerfil() {
		return fotoPerfil;
	}

	public void setFotoPerfil(String fotoPerfil) {
		this.fotoPerfil = fotoPerfil;
	}

	public BigInteger getFechaUltimaEstancia() {
		return fechaUltimaEstancia;
	}

	public void setFechaUltimaEstancia(BigInteger fechaUltimaEstancia) {
		this.fechaUltimaEstancia = fechaUltimaEstancia;
	}

	public BigInteger getFechaUltimoAlquiler() {
		return fechaUltimoAlquiler;
	}

	public void setFechaUltimoAlquiler(BigInteger fechaUltimoAlquiler) {
		this.fechaUltimoAlquiler = fechaUltimoAlquiler;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getHash() {
		return hash;
	}

	public void setHash(String hash) {
		this.hash = hash;
	}

	public String getRol() {
		return rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public int getAnhoNacimiento() {
		return anhoNacimiento;
	}

	public void setAnhoNacimiento(int anhoNacimiento) {
		this.anhoNacimiento = anhoNacimiento;
	}

	public BigDecimal getValoracion() {
		return valoracion;
	}

	public void setValoracion(BigDecimal valoracion) {
		this.valoracion = valoracion;
	}

	public List<Piso> getPropiedades() {
		return propiedades;
	}

	public void setPropiedades(List<Piso> propiedades) {
		this.propiedades = propiedades;
	}

	public List<Piso> getPisosInteres() {
		return pisosInteres;
	}

	public void setPisosInteres(List<Piso> pisosInteres) {
		this.pisosInteres = pisosInteres;
	}

	public Piso getPisoActual() {
		return pisoActual;
	}

	public void setPisoActual(Piso pisoActual) {
		this.pisoActual = pisoActual;
	}

	public void eliminarPisoPorId(int idPiso) {
	    Iterator<Piso> iterador = pisosInteres.iterator();
	    while (iterador.hasNext()) {
	        Piso piso = iterador.next();
	        if (piso.getIdPiso() == idPiso) {
	            iterador.remove();
	            break;
	        }
	    }
	}
	
	
}
