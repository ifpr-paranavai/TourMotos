package com.backend.utils;

import com.backend.entity.Moto;
import com.backend.exception.InfoException;
import org.springframework.http.HttpStatus;

public class UtilsMoto {
    public static Boolean validarMoto(Moto moto) throws InfoException {
        if (moto.getModelo() == null || moto.getModelo().equals("")) {
            throw new InfoException("Ocorreu um erro ao cadastrar moto", HttpStatus.BAD_REQUEST);
        }
        if (moto.getMarca() == null || moto.getMarca().equals("")) {
            throw new InfoException("Ocorreu um erro ao cadastrar moto", HttpStatus.BAD_REQUEST);
        }
        return true;
    }
}
