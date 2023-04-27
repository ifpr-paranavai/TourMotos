package com.backend.service.Rota;

import com.backend.entity.Rota;
import com.backend.exception.InfoException;

import java.util.List;

public interface RotaService {
    List<Rota> buscarTodos();

    Rota inserir(Rota rota) throws InfoException;

    Rota alterar(Long id, Rota rota) throws InfoException;

    void excluir(Long id) throws InfoException;
}
