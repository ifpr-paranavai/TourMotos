package com.backend.service.Moto;

import com.backend.repository.MotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MotoServiceImpl extends MotoService {
    @Autowired
    private MotoRepository motoRepository;
}