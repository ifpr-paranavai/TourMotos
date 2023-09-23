package com.backend.controller;

import com.backend.entity.Rota;
import com.backend.exception.InfoException;
import com.backend.service.Rota.RotaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rota")
@RequiredArgsConstructor
@CrossOrigin()
public class RotaController {

    private final RotaService rotaService;

    @GetMapping("/listar")
    @CrossOrigin("http://localhost:4200")
    public List<Rota> buscarTodos() {
        return rotaService.buscarTodos();
    }

    @GetMapping("/listar/{id}")
    @CrossOrigin("http://localhost:4200")
    public List<Rota> buscarPorMotociclista(@PathVariable("id") Long id) throws InfoException {
        return rotaService.buscarPorMotociclista(id);
    }

    @PostMapping("/cadastrar")
    @CrossOrigin("http://localhost:4200")
    public Rota inserir(@RequestBody Rota rota) throws InfoException {
        return rotaService.inserir(rota);
    }

    @PutMapping("/atualizar/{id}")
    @CrossOrigin("http://localhost:4200")
    public Rota alterar(@PathVariable("id") Long id, @RequestBody Rota rota) throws InfoException {
        return rotaService.alterar(id, rota);
    }

    @DeleteMapping("/deletar/{id}")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<Void> excluir(@PathVariable("id") Long id) throws InfoException {
        rotaService.excluir(id);
        return ResponseEntity.ok().build();
    }
}
