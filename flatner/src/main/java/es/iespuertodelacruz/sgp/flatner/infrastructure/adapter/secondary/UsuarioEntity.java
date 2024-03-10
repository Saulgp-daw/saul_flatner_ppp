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

	//bi-directional many-to-one association to PisoReporteEntity
	@OneToMany(mappedBy="denunciante")
	private List<PisoReporteEntity> pisoReportes;

	//bi-directional many-to-one association to UsuarioReporteEntity
	@OneToMany(mappedBy="denunciante")
	private List<UsuarioReporteEntity> denunciante;

	//bi-directional many-to-one association to UsuarioReporteEntity
	@OneToMany(mappedBy="reportado")
	private List<UsuarioReporteEntity> reportado;

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

	public PisoEntity getPisoActual() {
		return this.pisoActual;
	}

	public void setPisoActual(PisoEntity piso) {
		this.pisoActual = piso;
	}

	public List<WatchlistEntity> getPisosInteres() {
		return this.pisosInteres;
	}

	public void setPisosInteres(List<WatchlistEntity> pisosInteres) {
		this.pisosInteres = pisosInteres;
	}

	public WatchlistEntity addPisosIntere(WatchlistEntity pisosIntere) {
		getPisosInteres().add(pisosIntere);
		pisosIntere.setUsuario(this);

		return pisosIntere;
	}

	public WatchlistEntity removePisosIntere(WatchlistEntity pisosIntere) {
		getPisosInteres().remove(pisosIntere);
		pisosIntere.setUsuario(null);

		return pisosIntere;
	}

	public List<PisoReporteEntity> getPisoReportes() {
		return this.pisoReportes;
	}

	public void setPisoReportes(List<PisoReporteEntity> pisoReportes) {
		this.pisoReportes = pisoReportes;
	}

	public PisoReporteEntity addPisoReporte(PisoReporteEntity pisoReporte) {
		getPisoReportes().add(pisoReporte);
		pisoReporte.setDenunciante(this);

		return pisoReporte;
	}

	public PisoReporteEntity removePisoReporte(PisoReporteEntity pisoReporte) {
		getPisoReportes().remove(pisoReporte);
		pisoReporte.setDenunciante(null);

		return pisoReporte;
	}

	public List<UsuarioReporteEntity> getDenunciante() {
		return this.denunciante;
	}

	public void setDenunciante(List<UsuarioReporteEntity> denunciante) {
		this.denunciante = denunciante;
	}

	public UsuarioReporteEntity addDenunciante(UsuarioReporteEntity denunciante) {
		getDenunciante().add(denunciante);
		denunciante.setDenunciante(this);

		return denunciante;
	}

	public UsuarioReporteEntity removeDenunciante(UsuarioReporteEntity denunciante) {
		getDenunciante().remove(denunciante);
		denunciante.setDenunciante(null);

		return denunciante;
	}

	public List<UsuarioReporteEntity> getReportado() {
		return this.reportado;
	}

	public void setReportado(List<UsuarioReporteEntity> reportado) {
		this.reportado = reportado;
	}

	public UsuarioReporteEntity addReportado(UsuarioReporteEntity reportado) {
		getReportado().add(reportado);
		reportado.setReportado(this);

		return reportado;
	}

	public UsuarioReporteEntity removeReportado(UsuarioReporteEntity reportado) {
		getReportado().remove(reportado);
		reportado.setReportado(null);

		return reportado;
	}

}