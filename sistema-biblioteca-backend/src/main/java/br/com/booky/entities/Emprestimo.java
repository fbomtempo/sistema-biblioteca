package br.com.booky.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import br.com.booky.entities.enums.DisponibilidadeLivro;
import br.com.booky.entities.enums.SituacaoEmprestimo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "TB_EMPRESTIMO")
public class Emprestimo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "id_cliente")
	private Cliente cliente;
	
	@ManyToOne
	@JoinColumn(name= "id_livro")
	private Livro livro;
	
	@Column(nullable = false)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate dataEmprestimo;
	
	@Column(nullable = false)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate dataDevolucao;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, length = 20)
	public SituacaoEmprestimo situacaoEmprestimo;
	
	public void realizarEmprestimo() {
		setSituacaoEmprestimo(SituacaoEmprestimo.REALIZADO);
		getLivro().setDisponibilidadeLivro(DisponibilidadeLivro.INDISPONIVEL);
	}
	
	public void finalizarEmprestimo() {
		setSituacaoEmprestimo(SituacaoEmprestimo.FINALIZADO);
		getLivro().setDisponibilidadeLivro(DisponibilidadeLivro.DISPONIVEL);
	}
	
	public void cancelarEmprestimo() {
		getLivro().setDisponibilidadeLivro(DisponibilidadeLivro.DISPONIVEL);
	}
}