package com.backend.repository;


import com.backend.entity.Parada;
import com.backend.entity.Rota;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParadaRepository extends JpaRepository<Parada, Long> {

    List<Parada> findAllByRota_Id(Long id);
}