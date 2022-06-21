package br.com.booky.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.booky.entities.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

	List<Cliente> findAllByOrderByIdAsc();
}
