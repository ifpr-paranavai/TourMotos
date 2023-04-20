package com.backend.repository;

import com.backend.entity.Motociclista;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MotociclistaRepository extends JpaRepository<Motociclista, Long> {
}