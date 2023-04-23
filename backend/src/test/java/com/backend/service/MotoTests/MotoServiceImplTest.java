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
        Moto moto = new Moto("", "marca");
        InfoException ex = assertThrows(InfoException.class, () -> motoService.inserir(moto));
        assertEquals("Ocorreu um erro ao cadastrar moto", ex.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, ex.getStatus());
    }
}