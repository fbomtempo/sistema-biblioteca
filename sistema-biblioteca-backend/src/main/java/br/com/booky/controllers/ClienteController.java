package br.com.booky.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.booky.entities.Cliente;
import br.com.booky.services.ClienteService;

@RestController
@RequestMapping(value = "/api/clientes")
public class ClienteController {

    @Autowired
    private ClienteService service;
    
    @GetMapping
    public ResponseEntity<List<Cliente>> recuperarTodos() {
        List<Cliente> lista = service.recuperarTodos();
        return ResponseEntity.ok().body(lista);
    }
    
    @GetMapping(value = "/{id}")
    public ResponseEntity<Cliente> recuperarPorId(@PathVariable Long id) {
        Cliente obj = service.recuperarPorId(id);
        return ResponseEntity.ok().body(obj);
    }
    
    @PostMapping
    public ResponseEntity<Cliente> inserir(@RequestBody Cliente cliente) {
        Cliente obj = service.inserir(cliente);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).body(obj);
    }
    
    @PutMapping(value = "/{id}")
    public ResponseEntity<Cliente> alterar(@PathVariable Long id, @RequestBody Cliente cliente) {
        Cliente obj = service.alterar(id, cliente);
        return ResponseEntity.ok().body(obj);
    }
    
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping(value = "/teste")
    public ResponseEntity<Teste> recuperarTodosTeste() {
        List<Cliente> lista = service.recuperarTodos();
        Teste list = new Teste();
        list.items.addAll(lista);
        return ResponseEntity.ok().body(list);
    }
}
