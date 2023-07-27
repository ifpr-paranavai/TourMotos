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

    @GetMapping("/listar")
    @CrossOrigin("http://localhost:4200")
    public List<Moto> buscarTodos() {
        return motoService.buscarTodos();
    }

    @PostMapping("/cadastrar")
    @CrossOrigin("http://localhost:4200")
    public Moto inserir(@RequestBody Moto moto) throws InfoException {
        return motoService.inserir(moto);
    }

    @PutMapping("/atualizar/{id}")
    @CrossOrigin("http://localhost:4200")
    public Moto alterar(@PathVariable("id") Long id, @RequestBody Moto moto) throws InfoException {
        return motoService.alterar(id, moto);
    }

    @DeleteMapping("/deletar/{id}")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<Void> excluir(@PathVariable("id") Long id) throws InfoException {
        motoService.excluir(id);
        return ResponseEntity.ok().build();
    }
}
