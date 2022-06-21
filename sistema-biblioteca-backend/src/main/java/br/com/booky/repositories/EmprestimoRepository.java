package br.com.booky.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.booky.entities.Emprestimo;

public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {

	List<Emprestimo> findAllByOrderByIdAsc();
}
