package com.backend.utils;

import com.backend.entity.Motociclista;
import com.backend.exception.InfoException;
import org.springframework.http.HttpStatus;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UtilsMotociclista {
    public static Boolean validarMotociclista(Motociclista motociclista) throws InfoException {
        if (motociclista.getNome() == null || motociclista.getNome().equals("")) {
            throw new InfoException("Ocorreu um erro ao cadastrar motociclista", HttpStatus.BAD_REQUEST);
        }
        if (motociclista.getCpf() == null || motociclista.getCpf().equals("")) {
            throw new InfoException("Ocorreu um erro ao cadastrar motociclista", HttpStatus.BAD_REQUEST);
        }
        if (motociclista.getEmail() == null || motociclista.getEmail().equals("")) {
            throw new InfoException("Ocorreu um erro ao cadastrar motociclista", HttpStatus.BAD_REQUEST);
        }
        if (motociclista.getSenha() == null || motociclista.getSenha().equals("")) {
            throw new InfoException("Ocorreu um erro ao cadastrar motociclista", HttpStatus.BAD_REQUEST);
        }
        return true;
    }

    public static boolean validarCPF(String cpf) {

        // Remove o que não é número
        cpf = cpf.replaceAll("[^0-9]", "");

        // Verifica se tem 11 digitos
        if (cpf.length() != 11) {
            return false;
        }

        // Calcula o primeiro digito
        int[] multiplicadores = {10, 9, 8, 7, 6, 5, 4, 3, 2, 1};
        int soma = 0;
        for (int i = 0; i < 9; i++) {
            soma += multiplicadores[i] * Integer.parseInt(cpf.substring(i, i + 1));
        }
        int resto = soma % 11;
        if (resto < 2) {
            resto = 0;
        } else {
            resto = 11 - resto;
        }
        cpf += resto;

        // Calcula o segundo digito
        multiplicadores = new int[]{11, 10, 9, 8, 7, 6, 5, 4, 3, 2};
        soma = 0;
        for (int i = 0; i < 10; i++) {
            soma += multiplicadores[i] * Integer.parseInt(cpf.substring(i, i + 1));
        }
        resto = soma % 11;
        if (resto < 2) {
            resto = 0;
        } else {
            resto = 11 - resto;
        }
        cpf += resto;

        // Checa se o cpf é válido
        if (cpf.equals(cpf.replaceAll("[^0-9]", ""))) {
            return true;
        } else {
            return false;
        }
    }

    private static final String EMAIL_REGEX = "^[a-zA-Z0-9_!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9_!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";

    public static boolean validarEmail(String email) {
        Pattern pattern = Pattern.compile(EMAIL_REGEX);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }
}
