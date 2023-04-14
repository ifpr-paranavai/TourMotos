package com.backend.repository;

import com.backend.model.entity.Parada;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParadaRepository extends JpaRepository<Parada, Long> {
}