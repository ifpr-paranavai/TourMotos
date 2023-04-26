package com.backend.service.PontoInteresse;

import com.backend.entity.PontoInteresse;
import com.backend.exception.InfoException;

import java.util.List;

public interface PontoInteresseService {
    List<PontoInteresse> buscarTodos();

    PontoInteresse inserir(PontoInteresse pontoInteresse) throws InfoException;

    PontoInteresse alterar(Long id, PontoInteresse pontoInteresse) throws InfoException;

    void excluir(Long id) throws InfoException;
}
