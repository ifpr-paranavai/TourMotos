package com.backend.repository;

import com.backend.entity.Rota;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RotaRepository extends JpaRepository<Rota, Long> {
    List<Rota> findAllByMotociclista_Id(Long id);
}