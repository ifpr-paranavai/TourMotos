package com.backend.service.Moto;

import com.backend.entity.Moto;
import com.backend.exception.InfoException;
import com.backend.repository.MotoRepository;
import com.backend.utils.UtilsMoto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MotoServiceImpl implements MotoService {
    @Autowired
    private MotoRepository motoRepository;

    @Override
    public List<Moto> buscarTodos() {
        return motoRepository.findAll();
    }

    @Override
    public Moto inserir(Moto moto) throws InfoException {
        if (UtilsMoto.validarMoto(moto)) {
            return motoRepository.save(moto);
        } else throw new InfoException("Ocorreu um erro ao cadastrar moto", HttpStatus.BAD_REQUEST);
    }

    @Override
    public Moto alterar(Long id, Moto moto) throws InfoException {
        Optional<Moto> motoOptional = motoRepository.findById(id);
        if (motoOptional.isPresent()) {
            Moto motoBuilder = Moto.builder()
                    .id(id)
                    .modelo(moto.getModelo() != null ? moto.getModelo() : null)
                    .marca(moto.getMarca() != null ? moto.getMarca() : null)
                    .build();

            if (UtilsMoto.validarMoto(motoBuilder)) {
                motoRepository.save(motoBuilder);
            }
            return motoBuilder;
        } else {
            throw new InfoException("Moto não encontrada", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public void excluir(Long id) throws InfoException {
        Optional<Moto> moto = motoRepository.findById(id);

        if (moto.isPresent()) {
            motoRepository.delete(moto.get());
        } else {
            throw new InfoException("Moto não encontrada", HttpStatus.NOT_FOUND);
        }
    }
}