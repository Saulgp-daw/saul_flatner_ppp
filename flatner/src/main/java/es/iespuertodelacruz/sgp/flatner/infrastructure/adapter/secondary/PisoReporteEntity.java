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
 * The persistent class for the piso_reporte database table.
 * 
 */
@Entity
@Table(name="piso_reporte")
@NamedQuery(name="PisoReporteEntity.findAll", query="SELECT p FROM PisoReporteEntity p")
public class PisoReporteEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_piso_reporte")
	private int idPisoReporte;

	private String razon;

	//bi-directional many-to-one association to UsuarioEntity
	@ManyToOne
	@JoinColumn(name="denunciante")
	private UsuarioEntity denunciante;

	//bi-directional many-to-one association to PisoEntity
	@ManyToOne
	@JoinColumn(name="piso_reportado")
	private PisoEntity piso_reportado;

	public PisoReporteEntity() {
	}

	public int getIdPisoReporte() {
		return this.idPisoReporte;
	}

	public void setIdPisoReporte(int idPisoReporte) {
		this.idPisoReporte = idPisoReporte;
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

	public PisoEntity getPiso_reportado() {
		return this.piso_reportado;
	}

	public void setPiso_reportado(PisoEntity piso_reportado) {
		this.piso_reportado = piso_reportado;
	}

}