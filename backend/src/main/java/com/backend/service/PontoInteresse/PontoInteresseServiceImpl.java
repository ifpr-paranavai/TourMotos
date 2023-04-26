package com.backend.service.PontoInteresse;

import com.backend.entity.PontoInteresse;
import com.backend.exception.InfoException;
import com.backend.repository.PontoInteresseRepository;
import com.backend.utils.UtilsPontoInteresse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PontoInteresseServiceImpl implements PontoInteresseService {
    @Autowired
    private PontoInteresseRepository pontoInteresseRepository;

    @Override
    public List<PontoInteresse> buscarTodos() {
        return pontoInteresseRepository.findAll();
    }

    @Override
    public PontoInteresse inserir(PontoInteresse pontoInteresse) throws InfoException {
        if (UtilsPontoInteresse.validarPontoInteresse(pontoInteresse)) {
            return pontoInteresseRepository.save(pontoInteresse);
        } else throw new InfoException("Ocorreu um erro ao cadastrar pontoInteresse", HttpStatus.BAD_REQUEST);
    }

    @Override
    public PontoInteresse alterar(Long id, PontoInteresse pontoInteresse) throws InfoException {
        Optional<PontoInteresse> pontoInteresseOptional = pontoInteresseRepository.findById(id);
        if (pontoInteresseOptional.isPresent()) {
            PontoInteresse pontoInteresseBuilder = PontoInteresse.builder()
                    .id(id)
                    .nome(pontoInteresse.getNome() != null ? pontoInteresse.getNome() : null)
                    .endereco(pontoInteresse.getEndereco() != null ? pontoInteresse.getEndereco() : null)
                    .build();

            if (UtilsPontoInteresse.validarPontoInteresse(pontoInteresseBuilder)) {
                pontoInteresseRepository.save(pontoInteresseBuilder);
            }
            return pontoInteresseBuilder;
        } else {
            throw new InfoException("PontoInteresse não encontrada", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public void excluir(Long id) throws InfoException {
        Optional<PontoInteresse> pontoInteresse = pontoInteresseRepository.findById(id);

        if (pontoInteresse.isPresent()) {
            pontoInteresseRepository.delete(pontoInteresse.get());
        } else {
            throw new InfoException("PontoInteresse não encontrada", HttpStatus.NOT_FOUND);
        }
    }
}