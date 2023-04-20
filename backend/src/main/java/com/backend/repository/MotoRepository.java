package com.backend.repository;

import com.backend.entity.Moto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MotoRepository extends JpaRepository<Moto, Long> {
}