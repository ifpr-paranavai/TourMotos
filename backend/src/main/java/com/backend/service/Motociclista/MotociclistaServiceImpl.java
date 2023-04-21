package com.backend.service.Motociclista;

import com.backend.entity.Motociclista;
import com.backend.entity.Rota;
import com.backend.exception.InfoException;
import com.backend.repository.MotociclistaRepository;
import com.backend.repository.RotaRepository;
import com.backend.utils.UtilsMotociclista;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MotociclistaServiceImpl implements MotociclistaService {
    @Autowired
    private MotociclistaRepository motociclistaRepository;

    @Override
    public Motociclista inserir(Motociclista motociclista) throws InfoException {
        if (UtilsMotociclista.validarMotociclista(motociclista)) {
            return motociclistaRepository.save(motociclista);
        } else {
            throw new InfoException("Ocorreu um erro ao cadastrar motociclista", HttpStatus.BAD_REQUEST);
        }

    }

    @Override
    public Motociclista alterar(Long id, Motociclista motociclista) throws InfoException {
        Optional<Motociclista> motociclistaOptional = motociclistaRepository.findById(id);

        if (motociclistaOptional.isPresent()) {
            Motociclista motociclistaBuilder = Motociclista.builder()
                    .id(id)
                    .nome(motociclista.getNome() != null ? motociclista.getNome() : null)
                    .email(motociclista.getEmail() != null ? motociclista.getEmail() : null)
                    .cpf(motociclista.getCpf() != null ? motociclista.getCpf() : null)
                    .senha(motociclista.getSenha() != null ? motociclista.getSenha() : null)
                    .rota(motociclista.getRota() != null ? motociclista.getRota() : null)
                    .build();

            if (UtilsMotociclista.validarMotociclista(motociclistaBuilder)) {
                motociclistaRepository.save(motociclistaBuilder);
            }
            return motociclistaBuilder;
        } else {
            throw new InfoException("Motociclista não encontrada", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public void excluir(Long id) throws InfoException {
        Optional<Motociclista> motociclista = motociclistaRepository.findById(id);

        if (motociclista.isPresent()) {
            motociclistaRepository.delete(motociclista.get());
        } else {
            throw new InfoException("Motociclista não encontrada", HttpStatus.NOT_FOUND);
        }
    }
}