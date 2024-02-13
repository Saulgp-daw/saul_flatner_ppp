package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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

	private String password;

	private String rol;

	private String sexo;

	private BigDecimal valoracion;

	//bi-directional many-to-one association to PisoEntity
	@OneToMany(mappedBy="propietario")
	private List<PisoEntity> propiedades;

	//bi-directional many-to-many association to PisoEntity
//	@ManyToMany(mappedBy="usuarios_interesados")
//	private List<PisoEntity> pisos_interes;
	
	@ManyToMany(fetch= FetchType.LAZY)
	@JoinTable(
		name="watchlists"
		,joinColumns={
			@JoinColumn(name="email_usuario")
			}
		, inverseJoinColumns={
			@JoinColumn(name="id_piso")
			}
		)
	private List<PisoEntity> pisosInteres;

	//bi-directional many-to-one association to PisoEntity
	@ManyToOne
	@JoinColumn(name="id_piso_actual")
	private PisoEntity piso;

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

	public List<PisoEntity> getPropiedades() {
		return this.propiedades;
	}

	public void setPropiedades(List<PisoEntity> propiedades) {
		this.propiedades = propiedades;
	}

	public PisoEntity addPropiedade(PisoEntity propiedade) {
		getPropiedades().add(propiedade);
		propiedade.setPropietario(this);

		return propiedade;
	}

	public PisoEntity removePropiedade(PisoEntity propiedade) {
		getPropiedades().remove(propiedade);
		propiedade.setPropietario(null);

		return propiedade;
	}

	public List<PisoEntity> getPisos_interes() {
		return this.pisosInteres;
	}

	public void setPisos_interes(List<PisoEntity> pisos_interes) {
		this.pisosInteres = pisos_interes;
	}

	public PisoEntity getPiso() {
		return this.piso;
	}

	public void setPiso(PisoEntity piso) {
		this.piso = piso;
	}

}