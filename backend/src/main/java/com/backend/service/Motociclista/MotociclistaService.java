package com.backend.service.Motociclista;

import com.backend.entity.Motociclista;
import com.backend.exception.InfoException;

import java.util.List;

public interface MotociclistaService {

    List<Motociclista> buscarTodos();

    Motociclista inserir(Motociclista motociclista) throws InfoException;

    Motociclista alterar(Long id, Motociclista motociclista) throws InfoException;

    void excluir(Long id) throws InfoException;
}
