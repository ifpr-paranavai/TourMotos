package com.backend.service.PontoInteresse;

import com.backend.repository.PontoInteresseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PontoInteresseServiceImpl implements PontoInteresseService {
    @Autowired
    private PontoInteresseRepository pontoInteresseRepository;
}