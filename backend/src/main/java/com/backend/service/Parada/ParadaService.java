package com.backend.service.Parada;

import com.backend.entity.Parada;
import com.backend.exception.InfoException;

import java.util.List;

public interface ParadaService {

    List<Parada> buscarTodos();

    Parada inserir(Parada parada) throws InfoException;

    Parada alterar(Long id, Parada parada) throws InfoException;

    void excluir(Long id) throws InfoException;

    List<Parada> buscarPorRota(Long id);
}
