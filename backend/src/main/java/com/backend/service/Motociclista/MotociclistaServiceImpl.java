package com.backend.service.Motociclista;

import com.backend.repository.MotociclistaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MotociclistaServiceImpl extends MotociclistaService {
    @Autowired
    private MotociclistaRepository motociclistaRepository;
}