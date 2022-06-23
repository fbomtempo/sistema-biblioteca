package br.com.booky.entities.enums;

public enum SituacaoEmprestimo {

	PENDENTE(1),
	FINALIZADO(2);
	
	private Integer code;
	
	SituacaoEmprestimo(Integer code) {
		this.code = code;
	}
	
	public Integer getCode() {
		return code;
	}
}
