package com.backend.service.RotaTest;

import com.backend.entity.Parada;
import com.backend.entity.Rota;
import com.backend.exception.InfoException;
import com.backend.repository.ParadaRepository;
import com.backend.repository.RotaRepository;
import com.backend.service.Parada.ParadaServiceImpl;
import com.backend.service.Rota.RotaServiceImpl;
import com.backend.utils.UtilsParada;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class RotaServiceImplTest {

    @Mock
    private RotaRepository rotaRepository;

    @InjectMocks
    private RotaServiceImpl rotaService;

    @Test
    public void testAlterarRotaSucesso() throws InfoException {
        Long id = 1L;
        Rota rota = new Rota();
        rota.setId(id);
        rota.setPontoPartida("Origem");
        rota.setPontoDestino("Destino");
        rota.setDistancia(100.0);
        rota.setTempoViagem("2 horas");

        // Simular que a rota existe no repositório
        Mockito.when(rotaRepository.findById(id)).thenReturn(Optional.of(rota));

        Rota rotaAtualizada = rotaService.alterar(id, rota);

        // Verificar se a rota foi atualizada corretamente
        assert rotaAtualizada != null;
        assert rotaAtualizada.getId().equals(id);
        assert rotaAtualizada.getPontoPartida().equals("Origem");
        assert rotaAtualizada.getPontoDestino().equals("Destino");
        assert rotaAtualizada.getDistancia().equals(100.0);
        assert rotaAtualizada.getTempoViagem().equals("2 horas");
    }

    @Test
    public void testAlterarRotaNaoEncontrada() {
        Long id = 2L;
        Rota rota = new Rota();

        // Simular que a rota não existe no repositório
        Mockito.when(rotaRepository.findById(id)).thenReturn(Optional.empty());

        try {
            Rota rotaAtualizada = rotaService.alterar(id, rota);
        } catch (InfoException e) {
            // Verificar se a exceção foi lançada corretamente com status 404
            assert e.getStatus() == HttpStatus.NOT_FOUND;
        }
    }

}
