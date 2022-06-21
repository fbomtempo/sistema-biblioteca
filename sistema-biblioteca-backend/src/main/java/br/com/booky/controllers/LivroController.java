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

import br.com.booky.entities.Livro;
import br.com.booky.services.LivroService;

@RestController
@RequestMapping(value = "/api/livros")
public class LivroController {

    @Autowired
    private LivroService service;
    
    @GetMapping
    public ResponseEntity<List<Livro>> recuperarTodos() {
        List<Livro> lista = service.recuperarTodos();
        return ResponseEntity.ok().body(lista);
    }
    
    @GetMapping(value = "/{id}")
    public ResponseEntity<Livro> recuperarPorId(@PathVariable Long id) {
        Livro obj = service.recuperarPorId(id);
        return ResponseEntity.ok().body(obj);
    }
    
    @PostMapping
    public ResponseEntity<Livro> inserir(@RequestBody Livro livro) {
        Livro obj = service.inserir(livro);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).body(obj);
    }
    
    @PutMapping(value = "/{id}")
    public ResponseEntity<Livro> alterar(@PathVariable Long id, @RequestBody Livro livro) {
        Livro obj = service.alterar(id, livro);
        return ResponseEntity.ok().body(obj);
    }
    
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.noContent().build();
    }
}
