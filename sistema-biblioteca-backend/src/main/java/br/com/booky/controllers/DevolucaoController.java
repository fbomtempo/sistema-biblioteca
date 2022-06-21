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

import br.com.booky.entities.Devolucao;
import br.com.booky.services.DevolucaoService;

@RestController
@RequestMapping(value = "/api/devolucoes")
public class DevolucaoController {

    @Autowired
    private DevolucaoService service;
    
    @GetMapping
    public ResponseEntity<List<Devolucao>> recuperarTodos() {
        List<Devolucao> lista = service.recuperarTodos();
        return ResponseEntity.ok().body(lista);
    }
    
    @GetMapping(value = "/{id}")
    public ResponseEntity<Devolucao> recuperarPorId(@PathVariable Long id) {
        Devolucao obj = service.recuperarPorId(id);
        return ResponseEntity.ok().body(obj);
    }
    
    @PostMapping
    public ResponseEntity<Devolucao> inserir(@RequestBody Devolucao devolucao) {
        Devolucao obj = service.inserir(devolucao);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).body(obj);
    }
    
    @PutMapping(value = "/{id}")
    public ResponseEntity<Devolucao> alterar(@PathVariable Long id, @RequestBody Devolucao devolucao) {
        Devolucao obj = service.alterar(id, devolucao);
        return ResponseEntity.ok().body(obj);
    }
    
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.noContent().build();
    }
}
