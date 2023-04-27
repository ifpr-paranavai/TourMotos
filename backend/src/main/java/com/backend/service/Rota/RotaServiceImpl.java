package com.backend.service.Rota;

import com.backend.entity.Rota;
import com.backend.exception.InfoException;
import com.backend.repository.RotaRepository;
import com.backend.utils.UtilsRota;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RotaServiceImpl implements RotaService {
    @Autowired
    private RotaRepository rotaRepository;

    @Override
    public List<Rota> buscarTodos() {
        return rotaRepository.findAll();
    }

    @Override
    public Rota inserir(Rota rota) throws InfoException {
        if (UtilsRota.validarRota(rota)) {
            return rotaRepository.save(rota);
        } else throw new InfoException("Ocorreu um erro ao cadastrar rota", HttpStatus.BAD_REQUEST);
    }

    @Override
    public Rota alterar(Long id, Rota rota) throws InfoException {
        Optional<Rota> rotaOptional = rotaRepository.findById(id);
        if (rotaOptional.isPresent()) {
            Rota rotaBuilder = Rota.builder()
                    .id(id)
                    .distancia(rota.getDistancia() != null ? rota.getDistancia() : null)
                    .pontoDestino(rota.getPontoDestino() != null ? rota.getPontoDestino() : null)
                    .pontoPartida(rota.getPontoPartida() != null ? rota.getPontoPartida()  : null)
                    .pontoInteresse(rota.getPontoInteresse() != null ? rota.getPontoInteresse() : null)
                    .tempoEstimado(rota.getTempoEstimado() != null ? rota.getTempoEstimado() : null)
                    .parada(rota.getParada() != null ? rota.getParada() : null)
                    .build();

            if (UtilsRota.validarRota(rotaBuilder)) {
                rotaRepository.save(rotaBuilder);
            }
            return rotaBuilder;
        } else {
            throw new InfoException("Rota não encontrada", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public void excluir(Long id) throws InfoException {
        Optional<Rota> rota = rotaRepository.findById(id);

        if (rota.isPresent()) {
            rotaRepository.delete(rota.get());
        } else {
            throw new InfoException("Rota não encontrada", HttpStatus.NOT_FOUND);
        }
    }
}