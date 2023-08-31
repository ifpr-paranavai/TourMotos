package com.backend.service.Motociclista;

import com.backend.entity.Motociclista;
import com.backend.exception.InfoException;

import java.util.List;
import java.util.Optional;

public interface MotociclistaService{

    List<Motociclista> buscarTodos();

    Optional<Motociclista> buscaPerfilComLogin(String email, String senha) throws InfoException;

    Motociclista inserir(Motociclista motociclista) throws InfoException;

    Motociclista alterar(Long id, Motociclista motociclista) throws InfoException;

    void excluir(Long id) throws InfoException;

    Motociclista buscaPerfil(Long id) throws InfoException;
}
