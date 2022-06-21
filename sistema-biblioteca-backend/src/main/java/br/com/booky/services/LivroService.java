package br.com.booky.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.booky.entities.Livro;
import br.com.booky.entities.enums.DisponibilidadeLivro;
import br.com.booky.repositories.LivroRepository;

@Service
public class LivroService {

	@Autowired
	private LivroRepository repository;

	public List<Livro> recuperarTodos() {
		return repository.findAllByOrderByIdAsc();
	}

	public Livro recuperarPorId(Long id) {
		return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}

	public Livro inserir(Livro livro) {
		livro.setDisponibilidadeLivro(DisponibilidadeLivro.DISPONIVEL);
		return repository.save(livro);
	}

	public void remover(Long id) {
		repository.findById(id).map((livro) -> {
			repository.delete(livro);
			return Void.TYPE;
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}

	public Livro alterar(Long id, Livro livroAtualizado) {
		return repository.findById(id).map((livro) -> {
			livroAtualizado.setDisponibilidadeLivro(livro.getDisponibilidadeLivro());
			livroAtualizado.setId(livro.getId());
			return repository.save(livroAtualizado);
		}).get();
	}
}