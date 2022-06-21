package br.com.booky.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.booky.entities.Devolucao;
import br.com.booky.entities.Emprestimo;
import br.com.booky.entities.enums.SituacaoEmprestimo;
import br.com.booky.repositories.DevolucaoRepository;
import br.com.booky.repositories.EmprestimoRepository;
import br.com.booky.repositories.LivroRepository;

@Service
public class DevolucaoService {

	@Autowired
	private DevolucaoRepository repository;
	
	@Autowired
	private EmprestimoRepository emprestimoRepository;
	
	@Autowired
	private LivroRepository livroRepository;

	public List<Devolucao> recuperarTodos() {
		return repository.findAllByOrderByIdAsc();
	}

	public Devolucao recuperarPorId(Long id) {
		return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}

	public Devolucao inserir(Devolucao devolucao) {
		devolucao.setEmprestimo(emprestimoRepository.findById(devolucao.getEmprestimo().getId())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
		Emprestimo emprestimo = devolucao.getEmprestimo();
		if (emprestimo.getSituacaoEmprestimo() == SituacaoEmprestimo.REALIZADO) {
			emprestimo.finalizarEmprestimo();
			emprestimoRepository.save(devolucao.getEmprestimo());
			livroRepository.save(devolucao.getEmprestimo().getLivro());
			return repository.save(devolucao);
		}
		throw new IllegalStateException("Emprestimo já finalizado.");
	}

	public void remover(Long id) {
		repository.findById(id).map(devolucao -> {
			Emprestimo emprestimo = devolucao.getEmprestimo();
			emprestimo.realizarEmprestimo();
			emprestimoRepository.save(emprestimo);
			livroRepository.save(emprestimo.getLivro());
			repository.delete(devolucao);
			return Void.TYPE;
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}

	public Devolucao alterar(Long id, Devolucao novaDevolucao) {
		return repository.findById(id).map(antigoDevolucao -> {
			novaDevolucao.setId(antigoDevolucao.getId());
			return repository.save(novaDevolucao);
		}).get();
	}
}