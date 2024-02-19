package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.primary.dto;

public class RegisterDTO {
	private String email;
	private String password;
	
	public RegisterDTO(String email, String password) {
		super();
		this.email = email;
		this.password = password;
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
	
	
}
