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

import br.com.booky.entities.Emprestimo;
import br.com.booky.services.EmprestimoService;

@RestController
@RequestMapping(value = "/api/emprestimos")
public class EmprestimoController {

    @Autowired
    private EmprestimoService service;
    
    @GetMapping
    public ResponseEntity<List<Emprestimo>> recuperarTodos() {
        List<Emprestimo> lista = service.recuperarTodos();
        return ResponseEntity.ok().body(lista);
    }
    
    @GetMapping(value = "/{id}")
    public ResponseEntity<Emprestimo> recuperarPorId(@PathVariable Long id) {
        Emprestimo obj = service.recuperarPorId(id);
        return ResponseEntity.ok().body(obj);
    }
    
    @PostMapping
    public ResponseEntity<Emprestimo> inserir(@RequestBody Emprestimo emprestimo) {
        Emprestimo obj = service.inserir(emprestimo);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).body(obj);
    }
    
    @PutMapping(value = "/{id}")
    public ResponseEntity<Emprestimo> alterar(@PathVariable Long id, @RequestBody Emprestimo emprestimo) {
        Emprestimo obj = service.alterar(id, emprestimo);
        return ResponseEntity.ok().body(obj);
    }
    
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.noContent().build();
    }
}
