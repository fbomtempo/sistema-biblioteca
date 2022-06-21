package br.com.booky.entities.enums;

public enum DisponibilidadeLivro {

	DISPONIVEL(1),
	INDISPONIVEL(2);
	
	private Integer code;
	
	DisponibilidadeLivro(Integer code) {
		this.code = code;
	}
	
	public Integer getCode() {
		return code;
	}
}