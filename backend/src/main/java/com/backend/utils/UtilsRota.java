package com.backend.utils;

import com.backend.entity.Rota;
import com.backend.exception.InfoException;
import org.springframework.http.HttpStatus;

public class UtilsRota {
    public static Boolean validarRota(Rota rota) throws InfoException {
        if (rota.getDistancia() == null) {
            throw new InfoException("Ocorreu um erro ao cadastrar rota", HttpStatus.BAD_REQUEST);
        }
        if (rota.getPontoPartida() == null || rota.getPontoPartida().equals("")) {
            throw new InfoException("Ocorreu um erro ao cadastrar rota", HttpStatus.BAD_REQUEST);
        }
        if (rota.getPontoDestino() == null || rota.getPontoDestino().equals("")) {
            throw new InfoException("Ocorreu um erro ao cadastrar rota", HttpStatus.BAD_REQUEST);
        }
        return true;
    }
}
