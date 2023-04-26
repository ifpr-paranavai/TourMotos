package com.backend.utils;

import com.backend.entity.PontoInteresse;
import com.backend.exception.InfoException;
import org.springframework.http.HttpStatus;

public class UtilsPontoInteresse {
    public static Boolean validarPontoInteresse(PontoInteresse pontoInteresse) throws InfoException {
        if (pontoInteresse.getNome() == null || pontoInteresse.getNome().equals("")) {
            throw new InfoException("Ocorreu um erro ao cadastrar pontoInteresse", HttpStatus.BAD_REQUEST);
        }
        if (pontoInteresse.getEndereco() == null || pontoInteresse.getEndereco().equals("")) {
            throw new InfoException("Ocorreu um erro ao cadastrar pontoInteresse", HttpStatus.BAD_REQUEST);
        }
        if (pontoInteresse.getTipo() == null || pontoInteresse.getTipo().equals("")) {
            throw new InfoException("Ocorreu um erro ao cadastrar pontoInteresse", HttpStatus.BAD_REQUEST);
        }
        return true;
    }
}
