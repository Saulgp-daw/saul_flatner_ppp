package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.primary.dto;

import java.math.BigDecimal;
import java.math.BigInteger;

import jakarta.persistence.Column;

public class UsuarioDTO {
	private String nombre;
	private String apellidos;
	private int anhoNacimiento;
	private String fechaUltimaEstancia;
	private String fechaUltimoAlquiler;
	private String fotoPerfil;
	private String password;
	private String sexo;
	

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public int getAnhoNacimiento() {
		return anhoNacimiento;
	}

	public void setAnhoNacimiento(int anhoNacimiento) {
		this.anhoNacimiento = anhoNacimiento;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getFechaUltimaEstancia() {
		return fechaUltimaEstancia;
	}

	public void setFechaUltimaEstancia(String fechaUltimaEstancia) {
		this.fechaUltimaEstancia = fechaUltimaEstancia;
	}

	public String getFechaUltimoAlquiler() {
		return fechaUltimoAlquiler;
	}

	public void setFechaUltimoAlquiler(String fechaUltimoAlquiler) {
		this.fechaUltimoAlquiler = fechaUltimoAlquiler;
	}

	public String getFotoPerfil() {
		return fotoPerfil;
	}

	public void setFotoPerfil(String fotoPerfil) {
		this.fotoPerfil = fotoPerfil;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public UsuarioDTO() {
		super();
	}

	
	
	
}
