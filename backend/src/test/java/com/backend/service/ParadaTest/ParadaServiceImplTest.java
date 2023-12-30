package com.backend.service.ParadaTest;

import com.backend.entity.Parada;
import com.backend.entity.Rota;
import com.backend.exception.InfoException;
import com.backend.repository.ParadaRepository;
import com.backend.service.Parada.ParadaServiceImpl;
import com.backend.utils.UtilsParada;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class ParadaServiceImplTest {

    @Mock
    private ParadaRepository paradaRepository;

    @InjectMocks
    private ParadaServiceImpl paradaService;

    @Test
    public void testAlterarParadaComSucesso() throws InfoException {
        // Simular um caso de sucesso
        Long id = 1L;
        Parada parada = new Parada();
        parada.setId(id);
        parada.setNome("Nome");
        parada.setEndereco("Endereco");

        Rota rota = new Rota(); // Crie uma instância de Rota
        parada.setRota(rota);

        when(paradaRepository.findById(id)).thenReturn(Optional.of(new Parada()));

        Parada resultado = paradaService.alterar(id, parada);

        assertNotNull(resultado);
        assertEquals("Nome", resultado.getNome());
        assertEquals("Endereco", resultado.getEndereco());
        assertEquals(rota, resultado.getRota());

        verify(paradaRepository, times(1)).save(any());
    }

    @Test
    public void testAlterarParadaNaoEncontrada() {
        // Simular uma parada não encontrada
        Long id = 2L;
        Parada parada = new Parada();
        parada.setId(id);
        parada.setNome("Nome");
        parada.setEndereco("Endereco");

        Rota rota = new Rota(); // Crie uma instância de Rota
        parada.setRota(rota);

        when(paradaRepository.findById(id)).thenReturn(Optional.empty());

        try {
            paradaService.alterar(id, parada);
            fail("Deveria lançar uma InfoException");
        } catch (InfoException e) {
            assertEquals("Parada não encontrada", e.getMessage());
            assertEquals(HttpStatus.NOT_FOUND, e.getStatus());
        }

        verify(paradaRepository, never()).save(any());
    }

    @Test
    public void testAlterarParadaComCamposNulos() throws InfoException {
        // Simular a atualização com campos nulos
        Long id = 1L;
        Parada parada = new Parada();
        parada.setId(id);

        when(paradaRepository.findById(id)).thenReturn(Optional.of(new Parada()));

        Parada resultado = paradaService.alterar(id, parada);

        assertNotNull(resultado);
        assertNull(resultado.getNome());
        assertNull(resultado.getEndereco());
        assertNull(resultado.getRota());

        verify(paradaRepository, times(1)).save(any());
    }

    @Test
    public void testAlterarParadaComValidacaoMalsucedida() throws InfoException {
        // Simular uma validação malsucedida
        Long id = 1L;
        Parada parada = new Parada();
        parada.setId(id);
        parada.setNome("Nome");
        parada.setEndereco("Endereco");

        Rota rota = new Rota(); // Crie uma instância de Rota
        parada.setRota(rota);

        when(paradaRepository.findById(id)).thenReturn(Optional.of(new Parada()));
        when(UtilsParada.validarParada(any())).thenReturn(false);

        try {
            paradaService.alterar(id, parada);
            fail("Deveria lançar uma InfoException");
        } catch (InfoException e) {
            // Verifique a mensagem e o estado apropriados para erros de validação.
            assertEquals("Erro de validação", e.getMessage());
            assertEquals(HttpStatus.BAD_REQUEST, e.getStatus());
        }

        verify(paradaRepository, never()).save(any());
    }

}
