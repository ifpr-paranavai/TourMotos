package com.backend.utils;

import com.backend.entity.Motociclista;
import com.backend.exception.InfoException;
import org.springframework.http.HttpStatus;

public class UtilsMotociclista {
    public static Boolean validarMotociclista(Motociclista motociclista) throws InfoException {
        if (motociclista.getNome() == null || motociclista.getNome().equals("")) {
            throw new InfoException("MESSAGE.NOME_REQUIRED", HttpStatus.BAD_REQUEST);
        }
        if (motociclista.getCpf() == null || motociclista.getCpf().equals("")) {
            throw new InfoException("MESSAGE.CPF_REQUIRED", HttpStatus.BAD_REQUEST);
        }
        if (motociclista.getEmail() == null || motociclista.getEmail().equals("")) {
            throw new InfoException("MESSAGE.EMAIL_REQUIRED", HttpStatus.BAD_REQUEST);
        }
        if (motociclista.getSenha() == null || motociclista.getSenha().equals("")) {
            throw new InfoException("MESSAGE.ENDERECO_REQUIRED", HttpStatus.BAD_REQUEST);
        }
        return true;
    }
}
