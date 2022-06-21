package br.com.booky.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.booky.entities.Cliente;
import br.com.booky.repositories.ClienteRepository;

@Service
public class ClienteService {

	@Autowired
	private ClienteRepository repository;

	public List<Cliente> recuperarTodos() {
		return repository.findAllByOrderByIdAsc();
	}

	public Cliente recuperarPorId(Long id) {
		return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}

	public Cliente inserir(Cliente cliente) {
		return repository.save(cliente);
	}

	public void remover(Long id) {
		repository.findById(id).map((cliente) -> {
			repository.delete(cliente);
			return Void.TYPE;
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}

	public Cliente alterar(Long id, Cliente clienteAtualizado) {
		return repository.findById(id).map((cliente) -> {
			clienteAtualizado.setId(cliente.getId());
			return repository.save(clienteAtualizado);
		}).get();
	}
}