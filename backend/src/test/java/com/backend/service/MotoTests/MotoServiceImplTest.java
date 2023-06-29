package com.backend.service.MotoTests;

import com.backend.entity.Moto;
import com.backend.exception.InfoException;
import com.backend.repository.MotoRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@SpringBootTest
public class MotoServiceImplTest {

    @Mock
    private MotoRepository motoRepository;

    @InjectMocks
    private MotoServiceImpl motoService;

    @Test
    public void testBuscarTodos() {
        List<Moto> motos = new ArrayList<>();
        motos.add(new Moto("modelo1", "marca1"));
        motos.add(new Moto("modelo2", "marca2"));
        when(motoRepository.findAll()).thenReturn(motos);
        assertEquals(2, motoService.buscarTodos().size());
    }
    @Test
    public void testInserirMotoInvalida() {
        // Caso de Teste 2: Modelo inválido (vazio) e marca válida
        Moto moto1 = new Moto("", "XYZ");
        InfoException ex1 = assertThrows(InfoException.class, () -> motoService.inserir(moto1));
        assertEquals("Ocorreu um erro ao cadastrar moto", ex1.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, ex1.getStatus());
        // Caso de Teste 3: Modelo válido e marca inválida (vazia)
        Moto moto2 = new Moto("ABC", "");
        InfoException ex2 = assertThrows(InfoException.class, () -> motoService.inserir(moto2));
        assertEquals("Ocorreu um erro ao cadastrar moto", ex2.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, ex2.getStatus());
        // Caso de Teste 4: Modelo inválido (vazio) e marca inválida (vazia)
        Moto moto3 = new Moto("", "");
        InfoException ex3 = assertThrows(InfoException.class, () -> motoService.inserir(moto3));
        assertEquals("Ocorreu um erro ao cadastrar moto", ex3.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, ex3.getStatus());
    }

}