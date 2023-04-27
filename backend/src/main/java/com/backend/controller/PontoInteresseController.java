package com.backend.controller;

import com.backend.entity.PontoInteresse;
import com.backend.exception.InfoException;
import com.backend.service.PontoInteresse.PontoInteresseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pontoInteresse")
@RequiredArgsConstructor
@CrossOrigin()
public class PontoInteresseController {

    private final PontoInteresseService pontoInteresseService;

    @GetMapping("/listar")
    public List<PontoInteresse> buscarTodos() {
        return pontoInteresseService.buscarTodos();
    }

    @PostMapping("/cadastrar")
    public PontoInteresse inserir(@RequestBody PontoInteresse pontoInteresse) throws InfoException {
        return pontoInteresseService.inserir(pontoInteresse);
    }

    @PutMapping("/atualizar/{id}")
    public PontoInteresse alterar(@PathVariable("id") Long id, @RequestBody PontoInteresse pontoInteresse) throws InfoException {
        return pontoInteresseService.alterar(id, pontoInteresse);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> excluir(@PathVariable("id") Long id) throws InfoException {
        pontoInteresseService.excluir(id);
        return ResponseEntity.ok().build();
    }
}
