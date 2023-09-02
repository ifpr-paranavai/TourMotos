package com.backend.controller;

import com.backend.entity.Moto;
import com.backend.exception.InfoException;
import com.backend.service.MotoTests.MotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/moto")
@RequiredArgsConstructor
@CrossOrigin()
public class MotoController {

    private final MotoService motoService;

    @CrossOrigin("http://localhost:4200")
    @GetMapping("/listar")
    public List<Moto> buscarTodos() {
        return motoService.buscarTodos();
    }

    @CrossOrigin("http://localhost:4200")
    @PostMapping("/cadastrar")
    public Moto inserir(@RequestBody Moto moto) throws InfoException {
        return motoService.inserir(moto);
    }

    @CrossOrigin("http://localhost:4200")
    @PutMapping("/atualizar/{id}")
    public Moto alterar(@PathVariable("id") Long id, @RequestBody Moto moto) throws InfoException {
        return motoService.alterar(id, moto);
    }
    @CrossOrigin("http://localhost:4200")
    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> excluir(@PathVariable("id") Long id) throws InfoException {
        motoService.excluir(id);
        return ResponseEntity.ok().build();
    }
}
