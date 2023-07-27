package com.backend.controller;

import com.backend.entity.Motociclista;
import com.backend.exception.InfoException;
import com.backend.service.Motociclista.MotociclistaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/motociclista")
@RequiredArgsConstructor
@CrossOrigin()
public class MotociclistaController {

    private final MotociclistaService motociclistaService;

    @GetMapping("/listar")
    @CrossOrigin("http://localhost:4200")
    public List<Motociclista> buscarTodos() {
        return motociclistaService.buscarTodos();
    }

    @PostMapping("/cadastrar")
    @CrossOrigin("http://localhost:4200")
    public Motociclista inserir(@RequestBody Motociclista motociclista) throws InfoException {
        return motociclistaService.inserir(motociclista);
    }

    @PutMapping("/atualizar/{id}")
    @CrossOrigin("http://localhost:4200")
    public Motociclista alterar(@PathVariable("id") Long id) throws InfoException {
        return motociclistaService.alterar(id);
    }

    @DeleteMapping("/deletar/{id}")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<Void> excluir(@PathVariable("id") Long id) throws InfoException {
        motociclistaService.excluir(id);
        return ResponseEntity.ok().build();
    }
}
