package com.backend.service.MotociclistaTest;

import com.backend.entity.Motociclista;
import com.backend.entity.Rota;
import com.backend.exception.InfoException;
import com.backend.repository.MotociclistaRepository;
import com.backend.repository.RotaRepository;
import com.backend.service.Motociclista.MotociclistaServiceImpl;
import com.backend.service.Rota.RotaServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Optional;

import static org.aspectj.bridge.MessageUtil.fail;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@SpringBootTest
public class MotociclistaServiceImplTest {

    @Mock
    private MotociclistaRepository motociclistaRepository;

    @InjectMocks
    private MotociclistaServiceImpl motociclistaService;

    private PasswordEncoder passwordEncoder;

    @Test
    public void testInserirMotociclistaValido() throws InfoException {
        Motociclista motociclista = new Motociclista();
        motociclista.setNome("João da Silva");
        motociclista.setCpf("123.456.789-00");
        motociclista.setEmail("joao@example.com");
        motociclista.setSenha("senha123");

        when(motociclistaRepository.findMotociclistaByEmail("joao@example.com")).thenReturn(null);
        when(motociclistaRepository.findByCpf("123.456.789-00")).thenReturn(new ArrayList<>());
        when(passwordEncoder.encode("senha123")).thenReturn("hashedPassword");

        Motociclista result = motociclistaService.inserir(motociclista);
        assertNotNull(result);
    }

    @Test
    public void testInserirMotociclistaEmailInvalido() {
        Motociclista motociclista = new Motociclista();
        motociclista.setEmail("email.invalido");

        try {
            motociclistaService.inserir(motociclista);
            fail("Deveria lançar uma InfoException para e-mail inválido.");
        } catch (InfoException e) {
            assertEquals(HttpStatus.BAD_REQUEST, e.getStatus());
        }
    }

}
