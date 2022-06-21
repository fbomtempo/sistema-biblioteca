package br.com.booky.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.booky.entities.Livro;

public interface LivroRepository extends JpaRepository<Livro, Long> {

	List<Livro> findAllByOrderByIdAsc();
}
