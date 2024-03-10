package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;


/**
 * The persistent class for the usuario_reporte database table.
 * 
 */
@Entity
@Table(name="usuario_reporte")
@NamedQuery(name="UsuarioReporteEntity.findAll", query="SELECT u FROM UsuarioReporteEntity u")
public class UsuarioReporteEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_usuario_reporte")
	private int idUsuarioReporte;

	private String razon;

	//bi-directional many-to-one association to UsuarioEntity
	@ManyToOne
	@JoinColumn(name="denunciante")
	private UsuarioEntity denunciante;

	//bi-directional many-to-one association to UsuarioEntity
	@ManyToOne
	@JoinColumn(name="reportado")
	private UsuarioEntity reportado;

	public UsuarioReporteEntity() {
	}

	public int getIdUsuarioReporte() {
		return this.idUsuarioReporte;
	}

	public void setIdUsuarioReporte(int idUsuarioReporte) {
		this.idUsuarioReporte = idUsuarioReporte;
	}

	public String getRazon() {
		return this.razon;
	}

	public void setRazon(String razon) {
		this.razon = razon;
	}

	public UsuarioEntity getDenunciante() {
		return this.denunciante;
	}

	public void setDenunciante(UsuarioEntity denunciante) {
		this.denunciante = denunciante;
	}

	public UsuarioEntity getReportado() {
		return this.reportado;
	}

	public void setReportado(UsuarioEntity reportado) {
		this.reportado = reportado;
	}

}