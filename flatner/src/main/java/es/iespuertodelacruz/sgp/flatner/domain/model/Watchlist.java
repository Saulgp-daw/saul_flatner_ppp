package es.iespuertodelacruz.sgp.flatner.domain.model;

public class Watchlist {
	private int id;
    private Piso piso;
    private Usuario usuario;
    private String anotaciones;
    
	public Watchlist() {
		super();
	}

	public Watchlist(int id, Piso piso, Usuario usuario, String anotaciones) {
		super();
		this.id = id;
		this.piso = piso;
		this.usuario = usuario;
		this.anotaciones = anotaciones;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Piso getPiso() {
		return piso;
	}

	public void setPiso(Piso piso) {
		this.piso = piso;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public String getAnotaciones() {
		return anotaciones;
	}

	public void setAnotaciones(String anotaciones) {
		this.anotaciones = anotaciones;
	}
    
    
}
