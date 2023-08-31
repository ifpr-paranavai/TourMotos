package com.backend.controller;

import com.backend.entity.Motociclista;
import com.backend.exception.InfoException;
import com.backend.service.Motociclista.MotociclistaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/motociclista")
@RequiredArgsConstructor
public class MotociclistaController {

    private final MotociclistaService motociclistaService;

    @CrossOrigin("http://localhost:4200")
    @GetMapping("/listar")
    public List<Motociclista> buscarTodos() {
        return motociclistaService.buscarTodos();
    }

    @CrossOrigin("http://localhost:4200")
    @GetMapping("/buscaPerfil/{id}")
    public Motociclista buscaPerfil(@PathVariable("id") Long id) throws InfoException {
        return motociclistaService.buscaPerfil(id);
    }

    @CrossOrigin("http://localhost:4200")
    @GetMapping("/buscaPerfilComLogin")
    public Optional<Motociclista> buscaPerfilComLogin(@RequestParam String email, @RequestParam String senha ) throws InfoException {
        return motociclistaService.buscaPerfilComLogin(email,senha);
    }


    @CrossOrigin("http://localhost:4200")
    @PostMapping("/cadastrar")
    public Motociclista inserir(@RequestBody Motociclista motociclista) throws InfoException {
        return motociclistaService.inserir(motociclista);
    }

    @CrossOrigin("http://localhost:4200")
    @PutMapping("/alterar/{id}")
    public Motociclista alterar(@PathVariable("id") Long id,@RequestBody Motociclista motociclista) throws InfoException {
        return motociclistaService.alterar(id,motociclista);
    }

    @CrossOrigin("http://localhost:4200")
    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> excluir(@PathVariable("id") Long id) throws InfoException {
        motociclistaService.excluir(id);
        return ResponseEntity.ok().build();
    }
}
