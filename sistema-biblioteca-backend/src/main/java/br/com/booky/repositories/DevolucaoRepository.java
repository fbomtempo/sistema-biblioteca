package br.com.booky.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.booky.entities.Devolucao;

public interface DevolucaoRepository extends JpaRepository<Devolucao, Long> {

	List<Devolucao> findAllByOrderByIdAsc();
}
