package com.backend.service.MotoTests;

import com.backend.entity.Moto;
import com.backend.exception.InfoException;

import java.util.List;

public interface MotoService {

    List<Moto> buscarTodos();

    Moto inserir(Moto moto) throws InfoException;

    Moto alterar(Long id, Moto moto) throws InfoException;

    void excluir(Long id) throws InfoException;
}
