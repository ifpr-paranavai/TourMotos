package com.backend.service.Parada;

import com.backend.entity.Parada;
import com.backend.exception.InfoException;
import com.backend.repository.ParadaRepository;
import com.backend.utils.UtilsParada;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ParadaServiceImpl implements ParadaService {
    @Autowired
    private ParadaRepository paradaRepository;

    @Override
    public List<Parada> buscarTodos() {
        return paradaRepository.findAll();
    }

    @Override
    public Parada inserir(Parada parada) throws InfoException {
        if (UtilsParada.validarParada(parada)) {
            return paradaRepository.save(parada);
        } else throw new InfoException("Ocorreu um erro ao cadastrar parada", HttpStatus.BAD_REQUEST);
    }

    @Override
    public Parada alterar(Long id, Parada parada) throws InfoException {
        Optional<Parada> paradaOptional = paradaRepository.findById(id);
        if (paradaOptional.isPresent()) {
            Parada paradaBuilder = Parada.builder()
                    .id(id)
                    .nome(parada.getNome() != null ? parada.getNome() : null)
                    .endereco(parada.getEndereco() != null ? parada.getEndereco() : null)
                    .rota(parada.getRota() != null ? parada.getRota() : null)
                    .build();

            if (UtilsParada.validarParada(paradaBuilder)) {
                paradaRepository.save(paradaBuilder);
            }
            return paradaBuilder;
        } else {
            throw new InfoException("Parada não encontrada", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public void excluir(Long id) throws InfoException {
        Optional<Parada> parada = paradaRepository.findById(id);

        if (parada.isPresent()) {
            paradaRepository.delete(parada.get());
        } else {
            throw new InfoException("Parada não encontrada", HttpStatus.NOT_FOUND);
        }
    }
}