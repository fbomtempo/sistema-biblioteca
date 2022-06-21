package br.com.booky.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.booky.entities.Emprestimo;
import br.com.booky.entities.Livro;
import br.com.booky.entities.enums.DisponibilidadeLivro;
import br.com.booky.repositories.EmprestimoRepository;
import br.com.booky.repositories.LivroRepository;

@Service
public class EmprestimoService {

	@Autowired
	private EmprestimoRepository repository;

	@Autowired
	private LivroRepository livroRepository;

	public List<Emprestimo> recuperarTodos() {
		return repository.findAllByOrderByIdAsc();
	}

	public Emprestimo recuperarPorId(Long id) {
		return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}

	public Emprestimo inserir(Emprestimo emprestimo) {
		emprestimo.setLivro(livroRepository.findById(emprestimo.getLivro().getId())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
		Livro livro = emprestimo.getLivro();
		if (livro.getDisponibilidadeLivro() == DisponibilidadeLivro.DISPONIVEL) {
			emprestimo.realizarEmprestimo();
			livroRepository.save(emprestimo.getLivro());
			return repository.save(emprestimo);
		}
		throw new IllegalStateException("Livro se encontra indisponível.");
	}

	public void remover(Long id) {
		repository.findById(id).map((emprestimo) -> {
			emprestimo.cancelarEmprestimo();
			livroRepository.save(emprestimo.getLivro());
			repository.delete(emprestimo);
			return Void.TYPE;
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}

	public Emprestimo alterar(Long id, Emprestimo novoEmprestimo) {
		return repository.findById(id).map(emprestimo -> {
			novoEmprestimo.setSituacaoEmprestimo(emprestimo.getSituacaoEmprestimo());
			novoEmprestimo.setId(emprestimo.getId());
			return repository.save(novoEmprestimo);
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}
}