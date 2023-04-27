package com.backend.controller;

import com.backend.entity.Parada;
import com.backend.exception.InfoException;
import com.backend.service.Parada.ParadaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parada")
@RequiredArgsConstructor
@CrossOrigin()
public class ParadaController {

    private final ParadaService paradaService;
    
    @GetMapping("/listar")
    public List<Parada> buscarTodos() {
        return paradaService.buscarTodos();
    }

    @PostMapping("/cadastrar")
    public Parada inserir(@RequestBody Parada parada) throws InfoException {
        return paradaService.inserir(parada);
    }

    @PutMapping("/atualizar/{id}")
    public Parada alterar(@PathVariable("id") Long id, @RequestBody Parada parada) throws InfoException {
        return paradaService.alterar(id, parada);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> excluir(@PathVariable("id") Long id) throws InfoException {
        paradaService.excluir(id);
        return ResponseEntity.ok().build();
    }
}
