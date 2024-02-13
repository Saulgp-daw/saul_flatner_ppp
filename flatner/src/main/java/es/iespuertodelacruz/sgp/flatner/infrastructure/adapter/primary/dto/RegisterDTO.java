package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.primary.dto;

public class RegisterDTO {
	private String email;
	private String password;
	private String nombre;
	
	public RegisterDTO(String email, String password, String nombre) {
		super();
		this.email = email;
		this.password = password;
		this.nombre = nombre;
	}

	public RegisterDTO() {
		super();
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
	
}
