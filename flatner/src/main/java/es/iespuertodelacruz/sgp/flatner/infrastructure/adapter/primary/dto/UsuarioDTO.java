package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.primary.dto;

import java.math.BigDecimal;
import java.math.BigInteger;

import jakarta.persistence.Column;

public class UsuarioDTO {
	private String email;
	private String nombre;
	private boolean active;
	private int anhoNacimiento;
	private String apellidos;
	private BigInteger fechaUltimaEstancia;
	private BigInteger fechaUltimoAlquiler;
	private String fotoPerfil;
	private String hash;
	private String password;
	private String rol;
	private String sexo;
	private BigDecimal valoracion;
}
