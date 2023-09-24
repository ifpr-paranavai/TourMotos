package com.backend.utils;

import com.backend.entity.Parada;
import com.backend.exception.InfoException;
import org.springframework.http.HttpStatus;

public class UtilsParada {
    public static Boolean validarParada(Parada parada) throws InfoException {
        if (parada.getNome() == null || parada.getNome().equals("")) {
            throw new InfoException("Ocorreu um erro ao cadastrar parada", HttpStatus.BAD_REQUEST);
        }
        if (parada.getEndereco() == null || parada.getEndereco().equals("")) {
            throw new InfoException("Ocorreu um erro ao cadastrar parada", HttpStatus.BAD_REQUEST);
        }
        if (parada.getRota() == null || parada.getRota().equals("")) {
            throw new InfoException("Ocorreu um erro ao cadastrar parada", HttpStatus.BAD_REQUEST);
        }
        return true;
    }
}
