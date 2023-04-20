package com.backend.repository;


import com.backend.entity.Parada;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParadaRepository extends JpaRepository<Parada, Long> {
}