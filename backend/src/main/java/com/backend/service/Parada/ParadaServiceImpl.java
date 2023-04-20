package com.backend.service.Parada;

import com.backend.repository.ParadaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ParadaServiceImpl extends ParadaService {
    @Autowired
    private ParadaRepository paradaRepository;
}