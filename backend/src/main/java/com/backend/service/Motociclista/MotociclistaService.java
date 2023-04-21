package com.backend.service.Motociclista;

import com.backend.entity.Motociclista;
import com.backend.exception.InfoException;
public interface MotociclistaService {

    Motociclista inserir(Motociclista motociclista) throws InfoException;

    Motociclista alterar(Long id, Motociclista motociclista) throws InfoException;

    void excluir(Long id) throws InfoException;
}
